import { describe, it, expect, vi } from "vitest";
import z from "zod";
import { BiRpc } from "./index.ts";
import type { Rpc } from "../rpc/index.ts";

describe("BiRpc", () => {
  it("left peer calls right peer procedures", async () => {
    const { leftPeer, rightHandlers } = factory();

    await expect(leftPeer.call("ping", 123)).resolves.toBe("123");
    expect(rightHandlers.ping).toHaveBeenCalledWith(123);
  });

  it("right peer calls left peer procedures", async () => {
    const { rightPeer, leftHandlers } = factory();

    await expect(rightPeer.call("ready", "ok")).resolves.toEqual({
      ready: true,
    });
    expect(leftHandlers.ready).toHaveBeenCalledWith("ok");
  });

  it("requires exactly two peers", () => {
    const schema = {} satisfies Rpc.Schema<any>;

    expect(() => new BiRpc({ main: schema, worker: schema })).not.toThrow();

    expect(
      // @ts-expect-error -- BiRpc requires exactly two peers
      () => new BiRpc({ main: schema }),
    ).toThrow("BiRpc requires exactly two peers");

    expect(
      // @ts-expect-error -- BiRpc requires exactly two peers
      () => new BiRpc({ main: schema, worker: schema, oops: schema }),
    ).toThrow("BiRpc requires exactly two peers");

    expect(
      () =>
        // @ts-expect-error -- BiRpc requires exactly two peers
        new BiRpc({ main: schema, worker: schema, oops: schema, nah: schema }),
    ).toThrow("BiRpc requires exactly two peers");
  });

  describe("README", () => {
    it("runs the BiRpc example", async () => {
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
      const { leftTransport: mainTransport, rightTransport: workerTransport } =
        transportFactory();

      const workerPeer = biRpc.peer("worker", workerTransport, {
        compute: (value) => value * 2,
      });

      const mainPeer = biRpc.peer("main", mainTransport, {
        getConfig: (key) => (key === "factor" ? "2" : ""),
      });

      await expect(mainPeer.call("compute", 21)).resolves.toBe(42);
      await expect(workerPeer.call("getConfig", "factor")).resolves.toBe("2");
    });
  });
});

function factory() {
  const leftSchema = {
    ping: {
      in: z.number(),
      out: z.string(),
    },
  } satisfies Rpc.Schema<any>;

  const rightSchema = {
    ready: {
      in: z.string(),
      out: z.object({ ready: z.boolean() }),
    },
  } satisfies Rpc.Schema<any>;

  type LeftSchema = typeof leftSchema;
  type RightSchema = typeof rightSchema;

  const biRpc = new BiRpc({
    left: leftSchema,
    right: rightSchema,
  });

  const { leftTransport, rightTransport } = transportFactory();

  const leftHandlers: BiRpc.Handlers<RightSchema> = {
    ready: vi.fn(async (value) => ({ ready: value === "ok" })),
  };

  const rightHandlers: BiRpc.Handlers<LeftSchema> = {
    ping: vi.fn(async (value) => String(value)),
  };

  const leftPeer = biRpc.peer("left", leftTransport, leftHandlers);

  const rightPeer = biRpc.peer("right", rightTransport, rightHandlers);

  return {
    biRpc,
    leftPeer,
    rightPeer,
    leftHandlers,
    rightHandlers,
  };
}

function transportFactory() {
  const leftTarget = new EventTarget();

  const rightTarget = new EventTarget();

  const leftTransport: Rpc.Transport = {
    post(message) {
      rightTarget.dispatchEvent(new MessageEvent("message", { data: message }));
    },

    on(handler) {
      leftTarget.addEventListener("message", (event) => {
        void handler((event as MessageEvent).data);
      });
    },
  };

  const rightTransport: Rpc.Transport = {
    post(message) {
      leftTarget.dispatchEvent(new MessageEvent("message", { data: message }));
    },

    on(handler) {
      rightTarget.addEventListener("message", (event) => {
        void handler((event as MessageEvent).data);
      });
    },
  };

  return { leftTransport, rightTransport };
}
