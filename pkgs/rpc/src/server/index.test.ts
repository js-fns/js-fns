import { describe, it, expect, vi, assert } from "vitest";
import z from "zod";
import { RpcMessage } from "../message/index.ts";
import type { Rpc } from "../rpc/index.ts";
import { RpcServer } from "./index.ts";

describe("RpcServer", () => {
  it("should call the handler with the request message payload", async () => {
    const { handlers, clientRequest } = factory();
    const now = Date.now();

    await clientRequest("ping", now);

    expect(handlers.ping).toHaveBeenCalledWith(now);
  });

  it("responds with the handler result", async () => {
    const { clientRequest } = factory();
    const now = Date.now();

    const response = await clientRequest("ping", now);

    expect(response).toEqual({
      id: expect.any(String),
      kind: "response",
      status: "resolved",
      payload: now,
    });
  });

  it("validates the request message", async () => {
    const { getClientMessageHandler, transport } = factory();
    const handler = getClientMessageHandler();

    await handler({ id: crypto.randomUUID() } as any);

    // oxlint-disable-next-line typescript/unbound-method
    expect(transport.post).not.toHaveBeenCalled();
  });

  it("validates the request message payload", async () => {
    const { getClientMessageHandler, transport } = factory();
    const handler = getClientMessageHandler();

    await handler({
      id: RpcMessage.id(),
      kind: "request",
      name: "ping",
      payload: "123",
    } as any);

    // oxlint-disable-next-line typescript/unbound-method
    expect(transport.post).not.toHaveBeenCalled();
  });

  it("ignores messages with unknown procedure names", async () => {
    const { getClientMessageHandler, transport } = factory();
    const handler = getClientMessageHandler();

    await handler({
      id: RpcMessage.id(),
      kind: "request",
      name: "nope",
      payload: 123,
    } as any);

    // oxlint-disable-next-line typescript/unbound-method
    expect(transport.post).not.toHaveBeenCalled();
  });

  it("responds with handler errors", async () => {
    const { clientRequest } = factory();

    const response = await clientRequest("init", true);

    expect(response).toEqual({
      id: expect.any(String),
      kind: "response",
      status: "rejected",
      error: "Init failed",
    });
  });
});

function factory() {
  const schema = {
    ping: {
      in: z.number(),
      out: z.number(),
    },

    init: {
      in: z.boolean(),
      out: z.literal("ok"),
    },
  };

  type Schema = typeof schema;

  let curMessage: RpcMessage.Response<Schema> | undefined;

  function getServerMessage() {
    assert(curMessage, "Message never got set");
    return curMessage;
  }

  let curHandler: RpcServer.TransportOnHandler<Schema> | undefined;

  function getClientMessageHandler() {
    assert(curHandler, "Transport on handler never got set");
    return curHandler;
  }

  const transport: Rpc.Transport = {
    post: vi.fn().mockImplementation((message) => {
      curMessage = message;
    }),

    on: vi.fn().mockImplementation((handler) => {
      curHandler = handler;
    }),
  };

  const handlers: RpcServer.Handlers<Schema> = {
    ping: vi.fn((input: number) => input),

    init: vi.fn(() => {
      throw new Error("Init failed");
    }),
  };

  const rpc = new RpcServer(transport, schema, handlers);

  async function clientRequest<ProcedureName extends keyof Schema>(
    name: ProcedureName,
    payload: NoInfer<Rpc.SchemaProcedurePayload<Schema, ProcedureName, "in">>,
  ) {
    const clientMessageHandler = getClientMessageHandler();

    await clientMessageHandler({
      id: RpcMessage.id(),
      kind: "request",
      name: typeof payload === "number" ? "ping" : "init",
      payload,
    });

    return getServerMessage();
  }

  return {
    transport,
    schema,
    handlers,
    rpc,
    getClientMessageHandler,
    clientRequest,
  };
}
