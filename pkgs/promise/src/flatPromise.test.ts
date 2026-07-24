import { describe, expect, expectTypeOf, it } from "vitest";
import { flatPromise } from "./flatPromise.ts";

describe("flatPromise", () => {
  it("returns a promise and its control functions", () => {
    const flat = flatPromise<string>();

    expect(flat.promise).toBeInstanceOf(Promise);
    expect(flat.resolve).toBeTypeOf("function");
    expect(flat.reject).toBeTypeOf("function");
    expectTypeOf(flat.promise).toEqualTypeOf<Promise<string>>();
  });

  it("resolves the promise with the given value", async () => {
    const flat = flatPromise<{ value: string }>();
    const value = { value: "result" };

    flat.resolve(value);

    await expect(flat.promise).resolves.toBe(value);
  });

  it("supports promises without a value", async () => {
    const flat = flatPromise();

    flat.resolve();

    await expect(flat.promise).resolves.toBeUndefined();
  });

  it("rejects the promise with the given reason", async () => {
    const flat = flatPromise();
    const reason = new Error("Failure");

    flat.reject(reason);

    await expect(flat.promise).rejects.toBe(reason);
  });

  it("rejects the promise without a reason", async () => {
    const flat = flatPromise();

    flat.reject();

    await expect(flat.promise).rejects.toBeUndefined();
  });

  it("ignores attempts to settle the promise more than once", async () => {
    const flat = flatPromise<string>();

    flat.resolve("first");
    flat.resolve("second");
    flat.reject(new Error("Failure"));

    await expect(flat.promise).resolves.toBe("first");
  });
});
