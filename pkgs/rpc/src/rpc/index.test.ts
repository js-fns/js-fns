import { describe, it, expect, vi, assert } from "vitest";
import z from "zod";
import type { RpcClient } from "../client/index.ts";
import { RpcMessage } from "../message/index.ts";
import type { RpcServer } from "../server/index.ts";
import { Rpc } from "./index.ts";

describe("Rpc", () => {
  describe("client", () => {
    it("creates a client with the RPC schema", async () => {
      const { serverResponse, client } = factory();

      const callPromise = client.call("ping", 123);
      await serverResponse("123");

      await expect(callPromise).resolves.toBe("123");
    });
  });

  describe("server", () => {
    it("creates a server with the RPC schema", async () => {
      const { serverHandlers, clientRequest } = factory();

      const response = await clientRequest("ping", 123);
      expect(response).toEqual({
        id: expect.any(String),
        kind: "response",
        status: "resolved",
        payload: "123",
      });

      expect(serverHandlers.ping).toHaveBeenCalledWith(123);
    });
  });

  describe("interop", () => {
    it("allows its client and server to communicate", async () => {
      const { serverHandlers, client } = factory({
        schema: {
          hello: {
            in: z.string(),
            out: z.string(),
          },
        },

        serverHandlers: {
          hello: vi.fn((name) => `Hello, ${name}!`),
        },
      });

      const callPromise = client.call("hello", "Sasha");
      await expect(callPromise).resolves.toBe("Hello, Sasha!");

      expect(serverHandlers.hello).toHaveBeenCalledWith("Sasha");
    });
  });

  describe("README", () => {
    it("runs the Rpc example", async () => {
      const { client } = factory({
        schema: {
          greet: {
            in: z.object({ name: z.string() }),
            out: z.string(),
          },
        },

        serverHandlers: {
          greet: vi.fn(({ name }) => `Hello, ${name}!`),
        },
      });

      const greeting = await client.call("greet", { name: "Sasha" });

      expect(greeting).toBe("Hello, Sasha!");
    });
  });
});

const defaultSchema = {
  ping: {
    in: z.number(),
    out: z.string(),
  },
} satisfies Rpc.Schema<any>;

const defaultSetup: factory.Setup<typeof defaultSchema> = {
  schema: defaultSchema,

  serverHandlers: {
    ping: vi.fn((input: number) => String(input)),
  },
};

function factory<Setup extends factory.Setup<any> = typeof defaultSetup>(
  setup?: Setup,
): factory.Result<Setup> {
  const { schema, serverHandlers } = setup ? setup : defaultSetup;

  type Schema = Setup["schema"];

  const rpc = new Rpc(schema);

  let clientMessage: RpcMessage.Request<Schema> | undefined;
  let clientOnHandler: RpcClient.TransportOnHandler<Schema> | undefined;

  const serverTarget = new EventTarget();
  const clientTarget = new EventTarget();

  const clientTransport: Rpc.Transport = {
    post: vi.fn().mockImplementation((message) => {
      clientMessage = message;
      serverTarget.dispatchEvent(
        new MessageEvent("message", { data: message }),
      );
    }),

    on: vi.fn().mockImplementation((onHandler) => {
      clientOnHandler = onHandler;
      clientTarget.addEventListener("message", (event) => {
        void onHandler((event as MessageEvent).data);
      });
    }),
  };

  const serverResponse: factory.ResultServerResponse<Setup> = async (
    payload,
  ) => {
    await postpone();

    assert(clientMessage, "Message never got set");
    assert(clientOnHandler, "Transport on handler never got set");

    clientTarget.dispatchEvent(
      new MessageEvent("message", {
        data: {
          id: clientMessage.id,
          kind: "response",
          status: "resolved",
          payload,
        },
      }),
    );
    await postpone();
  };

  let serverMessage: RpcMessage.Response<Schema> | undefined;
  let serverOnHandler: RpcServer.TransportOnHandler<Schema> | undefined;

  const serverTransport: Rpc.Transport = {
    post: vi.fn().mockImplementation((message) => {
      serverMessage = message;
      clientTarget.dispatchEvent(
        new MessageEvent("message", { data: message }),
      );
    }),

    on: vi.fn().mockImplementation((onHandler) => {
      serverOnHandler = onHandler;
      serverTarget.addEventListener("message", (event) => {
        void onHandler((event as MessageEvent).data);
      });
    }),
  };

  const clientRequest: factory.ResultClientRequest<Setup> = async (
    name,
    payload,
  ) => {
    assert(serverOnHandler, "Transport on handler never got set");

    serverTarget.dispatchEvent(
      new MessageEvent("message", {
        data: {
          id: RpcMessage.id(),
          kind: "request",
          name,
          payload,
        },
      }),
    );
    await postpone();

    assert(serverMessage, "Message never got set");
    return serverMessage;
  };

  const client = rpc.client(clientTransport);
  const server = rpc.server(serverTransport, serverHandlers);

  return {
    schema,
    rpc,
    clientTransport,
    serverTransport,
    serverHandlers,
    client,
    server,
    serverResponse,
    clientRequest,
  };
}

namespace factory {
  export interface Setup<Schema extends Rpc.Schema<any>> {
    schema: Schema;

    serverHandlers: RpcServer.Handlers<NoInfer<Schema>>;
  }

  export interface Result<Setup extends factory.Setup<any>> {
    schema: Setup["schema"];
    rpc: Rpc<Setup["schema"]>;
    clientTransport: Rpc.Transport;
    serverTransport: Rpc.Transport;
    serverHandlers: RpcServer.Handlers<Setup["schema"]>;
    client: RpcClient<Setup["schema"]>;
    server: RpcServer<Setup["schema"]>;
    serverResponse: ResultServerResponse<Setup>;
    clientRequest: ResultClientRequest<Setup>;
  }

  export type ResultServerResponse<Setup extends factory.Setup<any>> = (
    payload: Rpc.SchemaProcedurePayload<
      Setup["schema"],
      keyof Setup["schema"],
      "out"
    >,
  ) => Promise<void>;

  export type ResultClientRequest<Setup extends factory.Setup<any>> = <
    ProcedureName extends keyof Setup["schema"],
  >(
    name: ProcedureName,
    payload: Rpc.SchemaProcedurePayload<Setup["schema"], ProcedureName, "in">,
  ) => Promise<RpcMessage.Response<Setup["schema"]>>;
}

function postpone() {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 0);
  });
}
