import { describe, expect, expectTypeOf, it } from "vitest";
import { resettablePromise } from "./resettablePromise.ts";

describe("resettablePromise", () => {
  it("returns a promise-like and its control functions", () => {
    const resettable = resettablePromise<string>();

    expect(resettable.resolve).toBeTypeOf("function");
    expect(resettable.reject).toBeTypeOf("function");
    expect(resettable.reset).toBeTypeOf("function");
    // oxlint-disable-next-line typescript/unbound-method
    expect(resettable.promise.then).toBeTypeOf("function");
    expectTypeOf(resettable.promise).toEqualTypeOf<PromiseLike<string>>();
  });

  it("resolves pending waiters with the given value", async () => {
    const resettable = resettablePromise<{ value: string }>();
    const value = { value: "result" };
    const waiter = Promise.resolve(resettable.promise);

    resettable.resolve(value);

    await expect(waiter).resolves.toBe(value);
  });

  it("supports promises without a value", async () => {
    const resettable = resettablePromise();
    const waiter = Promise.resolve(resettable.promise);

    resettable.resolve();

    await expect(waiter).resolves.toBeUndefined();
  });

  it("rejects pending waiters with the given reason", async () => {
    const resettable = resettablePromise();
    const reason = new Error("Failure");
    const waiter = Promise.resolve(resettable.promise);

    resettable.reject(reason);

    await expect(waiter).rejects.toBe(reason);
  });

  it("rejects the promise without a reason", async () => {
    const resettable = resettablePromise();
    const waiter = Promise.resolve(resettable.promise);

    resettable.reject();

    await expect(waiter).rejects.toBeUndefined();
  });

  it("resolves all concurrent waiters", async () => {
    const resettable = resettablePromise<string>();
    const waiters = [
      Promise.resolve(resettable.promise),
      Promise.resolve(resettable.promise),
      Promise.resolve(resettable.promise),
    ];

    resettable.resolve("done");

    await expect(Promise.all(waiters)).resolves.toEqual([
      "done",
      "done",
      "done",
    ]);
  });

  it("gives new waiters the settled value until reset", async () => {
    const resettable = resettablePromise<string>();

    resettable.resolve("first");

    await expect(Promise.resolve(resettable.promise)).resolves.toBe("first");
    await expect(Promise.resolve(resettable.promise)).resolves.toBe("first");
  });

  it("returns to pending after reset so stale values are not reused", async () => {
    const resettable = resettablePromise<string>();

    resettable.resolve("stale");
    resettable.reset();

    const waiter = Promise.resolve(resettable.promise);
    let settled = false;
    void waiter.then(() => {
      settled = true;
    });

    await Promise.resolve();
    expect(settled).toBe(false);

    resettable.resolve("fresh");

    await expect(waiter).resolves.toBe("fresh");
  });

  it("allows resolving with a new value after reset", async () => {
    const resettable = resettablePromise<string>();

    resettable.resolve("first");
    resettable.reset();
    resettable.resolve("second");

    await expect(Promise.resolve(resettable.promise)).resolves.toBe("second");
  });

  it("allows rejecting after a previous resolution was reset", async () => {
    const resettable = resettablePromise<string>();
    const reason = new Error("Failure");

    resettable.resolve("first");
    resettable.reset();

    const waiter = Promise.resolve(resettable.promise);
    resettable.reject(reason);

    await expect(waiter).rejects.toBe(reason);
  });
});
