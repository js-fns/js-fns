/**
 * @version 0.1.0
 *
 * Runs the given promise-returning functions with limited concurrency, keeping
 * at most `max` of them in flight at a time. The results are resolved in the
 * same order as the input functions.
 *
 * @param promises - The functions returning promises to run.
 * @param max - The maximum number of functions to run concurrently.
 *
 * @returns A promise that resolves with the results in the input order.
 */
export function promiseQueue<Type>(
  promises: Array<() => Promise<Type>>,
  max: number,
): Promise<Type[]> {
  const queue: Array<() => Promise<unknown>> = [];

  const all = Promise.all<Type>(
    Array.from({ length: promises.length }).map((_, index) => {
      const promise = new Promise<void>((resolve) => {
        queue[index] = () => {
          // Trigger the queue promise
          resolve();
          // Return it, so the worker function can wait for
          return promise;
        };
      }).then(() => promises[index]?.());
      return promise;
    }),
  );

  async function next() {
    const promise = queue.shift();
    if (!promise) return;
    await promise();
    return next();
  }

  // Create the worker functions.
  void Promise.all(Array.from({ length: max }).map(() => next()))
    // NOTE: Errors surface through `all`, so ignore the worker pool rejection
    // to avoid an unhandled rejection.
    .catch(() => {});

  return all;
}
