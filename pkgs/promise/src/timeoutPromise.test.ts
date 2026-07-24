import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { timeoutPromise } from "./timeoutPromise.ts";

describe("timeoutPromise", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolves after the given delay", async () => {
    const pending = timeoutPromise(100);
    let settled = false;
    void pending.then(() => {
      settled = true;
    });

    await vi.advanceTimersByTimeAsync(99);
    expect(settled).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    await expect(pending).resolves.toBeUndefined();
    expect(settled).toBe(true);
  });

  it("defaults the delay to 0", async () => {
    const pending = timeoutPromise();

    await vi.advanceTimersByTimeAsync(0);

    await expect(pending).resolves.toBeUndefined();
  });
});
