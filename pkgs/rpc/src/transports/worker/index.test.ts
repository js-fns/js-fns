import { afterEach, describe, expect, it, vi } from "vitest";
import z from "zod";
import { BiRpc } from "../../birpc/index.ts";
import { Rpc } from "../../rpc/index.ts";
import { RpcWorkerClientTransport, RpcWorkerServerTransport } from "./index.ts";
import type { RpcWorkerTransport } from "./types.ts";

describe("RpcWorkerTransport", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("connects an Rpc client and server", async () => {
    const { worker } = factory();

    const rpc = new Rpc({
      greet: {
        in: z.string(),
        out: z.string(),
      },
    });

    rpc.server(new RpcWorkerServerTransport(), {
      greet: (name) => `Hello, ${name}!`,
    });

    const client = rpc.client(new RpcWorkerClientTransport(worker));

    await expect(client.call("greet", "Sasha")).resolves.toBe("Hello, Sasha!");
  });

  it("connects two BiRpc peers", async () => {
    const { worker } = factory();

    const biRpc = new BiRpc({
      main: {
        compute: {
          in: z.number(),
          out: z.number(),
        },
      },
      worker: {
        getConfig: {
          in: z.string(),
          out: z.string(),
        },
      },
    });

    const workerPeer = biRpc.peer("worker", new RpcWorkerServerTransport(), {
      compute: (value) => value * 2,
    });

    const mainPeer = biRpc.peer("main", new RpcWorkerClientTransport(worker), {
      getConfig: (key) => (key === "factor" ? "2" : ""),
    });

    await expect(mainPeer.call("compute", 21)).resolves.toBe(42);
    await expect(workerPeer.call("getConfig", "factor")).resolves.toBe("2");
  });
});

function factory() {
  const clientHandlers: ((event: { data: unknown }) => void)[] = [];

  const serverHandlers: ((event: { data: unknown }) => void)[] = [];

  vi.stubGlobal("postMessage", (message: unknown) => {
    queueMicrotask(() => {
      for (const handler of clientHandlers) handler({ data: message });
    });
  });

  vi.stubGlobal(
    "addEventListener",
    (_type: "message", handler: (event: { data: unknown }) => void) => {
      serverHandlers.push(handler);
    },
  );

  const worker: RpcWorkerTransport.Worker = {
    postMessage(message) {
      queueMicrotask(() => {
        for (const handler of serverHandlers) handler({ data: message });
      });
    },

    addEventListener(_type, handler) {
      clientHandlers.push(handler);
    },
  };

  return { worker };
}
