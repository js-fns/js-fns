import { TinyFloat } from "js-fns";
import { Bench } from "tinybench";
import { Decimal } from "decimal.js";
import currency from "currency.js";

const x = "5032485723458348569331745.33434346346912144534543";
const y = "0.046875000000";

const tfX = new TinyFloat(x);
const tfY = new TinyFloat(y);
const decX = new Decimal(x);
const decY = new Decimal(y);
const curX = currency(x);
const curY = currency(y);

await run("constructor", [
  ["js-fns/decimal", () => new TinyFloat(x)],
  ["decimal.js", () => new Decimal(x)],
  ["currency.js", () => currency(x)],
]);

await run("add", [
  ["js-fns/decimal", () => tfX.add(tfY)],
  ["decimal.js", () => decX.add(decY)],
  ["currency.js", () => curX.add(curY)],
]);

await run("sub", [
  ["js-fns/decimal", () => tfX.sub(tfY)],
  ["decimal.js", () => decX.sub(decY)],
  ["currency.js", () => curX.subtract(curY)],
]);

await run("mul", [
  ["js-fns/decimal", () => tfX.mul(tfY)],
  ["decimal.js", () => decX.mul(decY)],
  ["currency.js", () => curX.multiply(curY)],
]);

await run("mod", [
  ["js-fns/decimal", () => tfX.mod(tfY)],
  ["decimal.js", () => decX.mod(decY)],
]);

async function run(name: string, tasks: [string, () => unknown][]) {
  const bench = new Bench({ name });

  for (const [name, task] of tasks) bench.add(name, task);

  await bench.run();

  console.log(bench.name);

  if (process.env.DEBUG) {
    console.table(bench.table());
    return;
  }

  const rows = Object.fromEntries(
    bench.results
      .map((result, idx) => {
        const task = bench.tasks[idx];
        if (!task) {
          return {
            Package: "???",
            mean: 0,
            moe: 0,
          };
        }

        if (result.state !== "completed") {
          return {
            Package: task.name,
            mean: 0,
            moe: 0,
          };
        }

        return {
          Package: task.name,
          mean: Math.round(result.throughput.mean),
          moe: Math.round(result.throughput.moe),
        };
      })
      .sort((a, b) => b.mean - a.mean)
      .map((row, idx) => [
        idx + 1,
        {
          Package: row.Package,
          "ops/s": `${row.mean.toLocaleString()} ± ${row.moe.toLocaleString()}`,
        },
      ]),
  );

  console.table(rows);
}
