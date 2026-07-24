import { describe, expect, it } from "vitest";
import { flatPromise } from "./flatPromise.ts";
import { promiseQueue } from "./promiseQueue.ts";

describe("promiseQueue", () => {
  it("resolves with the results in the input order", async () => {
    const result = await promiseQueue(
      [async () => "a", async () => "b", async () => "c"],
      2,
    );

    expect(result).toEqual(["a", "b", "c"]);
  });

  it("preserves the order regardless of completion timing", async () => {
    const gates = [flatPromise(), flatPromise(), flatPromise()];

    const all = promiseQueue(
      gates.map((gate, index) => async () => {
        await gate.promise;
        return index;
      }),
      3,
    );

    gates[2]!.resolve();
    gates[0]!.resolve();
    gates[1]!.resolve();

    await expect(all).resolves.toEqual([0, 1, 2]);
  });

  it("resolves with an empty array for no functions", async () => {
    await expect(promiseQueue([], 2)).resolves.toEqual([]);
  });

  it("runs at most max functions concurrently", async () => {
    const gates = Array.from({ length: 5 }, () => flatPromise());
    let active = 0;
    let peak = 0;

    const all = promiseQueue(
      gates.map((gate, index) => async () => {
        active += 1;
        peak = Math.max(peak, active);
        await gate.promise;
        active -= 1;
        return index;
      }),
      2,
    );

    await Promise.resolve();
    expect(peak).toBe(2);

    gates.forEach((gate) => gate.resolve());

    await expect(all).resolves.toEqual([0, 1, 2, 3, 4]);
    expect(peak).toBe(2);
  });

  it("runs all functions when max exceeds the count", async () => {
    let active = 0;
    let peak = 0;
    const gates = Array.from({ length: 3 }, () => flatPromise());

    const all = promiseQueue(
      gates.map((gate, index) => async () => {
        active += 1;
        peak = Math.max(peak, active);
        await gate.promise;
        active -= 1;
        return index;
      }),
      10,
    );

    await Promise.resolve();
    expect(peak).toBe(3);

    gates.forEach((gate) => gate.resolve());
    await expect(all).resolves.toEqual([0, 1, 2]);
  });

  it("runs functions sequentially when max is 1", async () => {
    const order: number[] = [];

    const result = await promiseQueue(
      [0, 1, 2].map((index) => async () => {
        order.push(index);
        return index;
      }),
      1,
    );

    expect(result).toEqual([0, 1, 2]);
    expect(order).toEqual([0, 1, 2]);
  });

  it("rejects when a function rejects", async () => {
    const reason = new Error("Failure");

    await expect(
      promiseQueue(
        [async () => 1, async () => Promise.reject(reason), async () => 3],
        2,
      ),
    ).rejects.toBe(reason);
  });
});
