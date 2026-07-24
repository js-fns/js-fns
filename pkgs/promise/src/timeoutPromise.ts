// NOTE: `setTimeout` is provided by runtimes such as browsers and Node.js, but
// it isn't part of ECMAScript. Define the minimal host capability locally to
// avoid depending on either DOM or Node.js types.
const host = globalThis as typeof globalThis & {
  setTimeout(callback: () => void, ms?: number): unknown;
};

/**
 * @version 0.1.0
 *
 * Returns a promise that resolves after the given delay.
 *
 * @param ms - The delay in milliseconds. Defaults to `0`.
 *
 * @returns A promise that resolves after the delay.
 */
export function timeoutPromise(ms?: number): Promise<void> {
  return new Promise((resolve) => host.setTimeout(resolve, ms ?? 0));
}
