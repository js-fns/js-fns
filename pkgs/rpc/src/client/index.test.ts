import { describe, it, expect, vi, assert } from "vitest";
import { RpcClient } from "./index.ts";
import z from "zod";
import type { RpcMessage } from "../message/index.ts";
import type { StandardSchemaV1 } from "../standardschema.ts";
import type { Rpc } from "../rpc/index.ts";

describe("RpcClient", () => {
  describe("call", () => {
    it("should call the transport post method with the correct message", async () => {
      const { transport, client, serverResponse } = factory();
      // oxlint-disable-next-line typescript/unbound-method
      const postMock = vi.mocked(transport.post);

      const now = Date.now();
      const callPromise = client.call("ping", now);

      await serverResponse(String(now));
      await callPromise;

      expect(postMock).toHaveBeenCalledWith({
        id: expect.any(String),
        kind: "request",
        name: "ping",
        payload: now,
      });
    });

    it("resolves with the response message payload", async () => {
      const { client, serverResponse } = factory();

      const now = Date.now();
      const callPromise = client.call("ping", now);

      await serverResponse(String(now));
      const result = await callPromise;

      expect(result).toEqual(String(now));
    });

    it("validates the response message", async () => {
      const { client, getClientMessage, getServerMessageHandler } = factory();

      const now = Date.now();
      const callPromise = client.call("ping", now);

      await postpone();
      const message = getClientMessage();
      const serverMessageHandler = getServerMessageHandler();

      await serverMessageHandler({ id: message.id } as any);

      await expect(callPromise).rejects.toThrow("Invalid response message");
    });

    it("validates the response message payload", async () => {
      const { client, serverResponse } = factory();

      const now = Date.now();
      const callPromise = client.call("ping", now);

      await serverResponse(123 as any);
      await expect(callPromise).rejects.toThrow(
        "Invalid response payload: Invalid input: expected string, received number",
      );
    });

    it("ignores messages without ids", async () => {
      const { client, getServerMessageHandler, serverResponse } = factory();

      const now = Date.now();
      const callPromise = client.call("ping", now);

      await postpone();
      const serverMessageHandler = getServerMessageHandler();

      await serverMessageHandler({} as any);
      await serverResponse(String(now));

      const result = await callPromise;

      expect(result).toBe(String(now));
    });

    it("ignores messages with unknown ids", async () => {
      const { client, getServerMessageHandler, serverResponse } = factory();

      const now = Date.now();
      const callPromise = client.call("ping", now);

      await postpone();
      const serverMessageHandler = getServerMessageHandler();

      await serverMessageHandler({
        id: "nope" as any,
        kind: "response",
        status: "resolved",
        payload: String(now),
      });
      await serverResponse(String(now));

      const result = await callPromise;

      expect(result).toBe(String(now));
    });

    it("ignores processed message requests", async () => {
      const {
        client,
        getClientMessage,
        getServerMessageHandler,
        serverResponse,
      } = factory();

      const now = Date.now();
      const callPromise = client.call("ping", now);

      await postpone();
      const message = getClientMessage();
      const serverMessageHandler = getServerMessageHandler();

      await serverResponse(String(now));
      await serverMessageHandler({
        id: message.id,
        kind: "response",
        status: "resolved",
        payload: String(now),
      });

      const result = await callPromise;

      expect(result).toBe(String(now));
    });
  });
});

function factory() {
  const schema = {
    ping: {
      in: z.number(),
      out: z.string(),
    },

    init: {
      in: z.boolean(),
      out: z.literal("ok"),
    },
  };

  type Schema = typeof schema;

  let curClientMessage: RpcMessage.Request<Schema> | undefined;

  function getClientMessage() {
    assert(curClientMessage, "Message never got set");
    return curClientMessage;
  }

  let curServerMessageHandler: RpcClient.TransportOnHandler<Schema> | undefined;

  function getServerMessageHandler() {
    assert(curServerMessageHandler, "Transport on handler never got set");
    return curServerMessageHandler;
  }

  const transport: Rpc.Transport = {
    post: vi.fn().mockImplementation((message) => {
      curClientMessage = message;
    }),

    on: vi.fn().mockImplementation((handler) => {
      curServerMessageHandler = handler;
    }),
  };

  const client = new RpcClient(transport, schema);

  async function serverResponse(
    payload: StandardSchemaV1.InferOutput<Schema[keyof Schema]["out"]>,
  ) {
    await postpone();

    const clientMessage = getClientMessage();
    const serverMessageHandler = getServerMessageHandler();

    return serverMessageHandler({
      id: clientMessage.id,
      kind: "response",
      status: "resolved",
      payload,
    });
  }

  return {
    transport,
    schema,
    client,
    getClientMessage,
    getServerMessageHandler,
    serverResponse,
  };
}

function postpone() {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 0);
  });
}
