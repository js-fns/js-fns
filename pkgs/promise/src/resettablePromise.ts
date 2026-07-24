import type { FlatPromise } from "./flatPromise.js";

/**
 * @version 0.1.0
 *
 * The function returns an object with a reusable promise and control functions.
 * After resolve or reject, new waiters receive the settled value until `reset`
 * is called, which returns the promise to the pending state so stale values are
 * not reused.
 *
 * @returns The resettable promise.
 */
export function resettablePromise<Type = void>(): ResettablePromise<Type> {
  let state: "pending" | "resolved" | "rejected" = "pending";
  let value: Type;
  let reason: unknown;
  let waiters: FlatPromise.Resolver<Type>[] = [];

  const currentPromise = () =>
    new Promise<Type>((resolve, reject) => {
      if (state === "resolved") return resolve(value);
      if (state === "rejected") return reject(reason);
      waiters.push({ resolve, reject });
    });

  const promise: PromiseLike<Type> = {
    // oxlint-disable-next-line unicorn/no-thenable -- It is intentional
    then: (onfulfilled, onrejected) =>
      currentPromise().then(onfulfilled, onrejected),
  };

  return {
    promise,

    resolve(nextValue) {
      state = "resolved";
      value = nextValue;
      const pendingWaiters = waiters;
      waiters = [];
      pendingWaiters.forEach((waiter) => waiter.resolve(nextValue));
    },

    reject(nextReason) {
      state = "rejected";
      reason = nextReason;
      const pendingWaiters = waiters;
      waiters = [];
      pendingWaiters.forEach((waiter) => waiter.reject(nextReason));
    },

    reset() {
      state = "pending";
    },
  };
}

/**
 * Resettable promise type. It's a reusable promise with resolve, reject, and
 * reset functions as an object.
 */
export interface ResettablePromise<
  Type = void,
> extends FlatPromise.Resolver<Type> {
  /** The reusable promise. */
  promise: PromiseLike<Type>;
  /** Resets the promise to the pending state. */
  reset: () => void;
}
