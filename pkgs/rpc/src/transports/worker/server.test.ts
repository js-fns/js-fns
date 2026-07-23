import { afterEach, assert, describe, expect, it, vi } from "vitest";
import z from "zod";
import { RpcMessage } from "../../message/index.ts";
import type { Rpc } from "../../rpc/index.ts";
import { RpcWorkerServerTransport } from "./server.ts";

describe("RpcWorkerServerTransport", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts responses and listens for requests", () => {
    const { handler, postMessage, receive, request, response, transport } =
      factory();

    void transport.post(response);
    receive(request);

    expect(postMessage).toHaveBeenCalledWith(response);
    expect(handler).toHaveBeenCalledWith(request);
  });
});

function factory() {
  const schema = {
    ping: {
      in: z.string(),
      out: z.number(),
    },
  } satisfies Rpc.Schema<any>;

  type Schema = typeof schema;

  let listener: ((event: { data: unknown }) => void) | undefined;

  function getListener() {
    assert(listener, "Worker listener never got set");
    return listener;
  }

  const postMessage = vi.fn();
  vi.stubGlobal("postMessage", postMessage);
  vi.stubGlobal(
    "addEventListener",
    vi.fn((_type, handler) => {
      listener = handler;
    }),
  );

  const transport: Rpc.Transport = new RpcWorkerServerTransport();
  const handler = vi.fn();
  void transport.on(handler);

  const request = {
    id: RpcMessage.id(),
    kind: "request",
    name: "ping",
    payload: "hello",
  } satisfies RpcMessage.Request<Schema>;

  const response = {
    id: request.id,
    kind: "response",
    status: "resolved",
    payload: 5,
  } satisfies RpcMessage.Response<Schema>;

  function receive(message: unknown) {
    getListener()({ data: message });
  }

  return { handler, postMessage, receive, request, response, transport };
}
