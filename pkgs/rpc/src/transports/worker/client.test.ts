import { assert, describe, expect, it, vi } from "vitest";
import z from "zod";
import { RpcMessage } from "../../message/index.ts";
import type { Rpc } from "../../rpc/index.ts";
import { RpcWorkerClientTransport } from "./client.ts";
import type { RpcWorkerTransport } from "./types.ts";

describe("RpcWorkerClientTransport", () => {
  it("posts requests and listens for responses", () => {
    const { handler, receive, request, response, transport, worker } =
      factory();

    transport.post(request);
    receive(response);

    expect(worker.postMessage).toHaveBeenCalledWith(request);
    expect(handler).toHaveBeenCalledWith(response);
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

  const worker = {
    postMessage: vi.fn(),

    addEventListener: vi.fn((_type, handler) => {
      listener = handler;
    }),
  } satisfies RpcWorkerTransport.Worker;

  const transport: Rpc.Transport = new RpcWorkerClientTransport(worker);
  const handler = vi.fn();
  transport.on(handler);

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

  return { handler, receive, request, response, transport, worker };
}
