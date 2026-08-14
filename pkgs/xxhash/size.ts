import watcher from "@parcel/watcher";
import { minify, transform } from "@swc/core";
import bytes from "bytes-iec";
import { readFile } from "node:fs/promises";
import { relative } from "node:path";
import { Readable } from "node:stream";
import { constants, createBrotliCompress } from "node:zlib";
import picocolors from "picocolors";

const { blue, green, gray, red } = picocolors;

const inputPath = process.argv[2];

if (!inputPath) {
  throw new Error("Missing input path argument");
}

const srcPath = relative(process.cwd(), inputPath);
const watch = process.argv.includes("--watch");
const debouncedMeasure = debounce(measure, 50);

let lastLength: number | undefined;
let lastSize: number | undefined;

await measure();

if (watch) {
  await watcher.subscribe(process.cwd(), (error, events) => {
    if (error) {
      console.error("The filesystem watcher encountered an error:");
      console.error(error);
      process.exit(1);
    }

    events.forEach((event) => {
      if (event.type !== "create" && event.type !== "update") return;
      const path = relative(process.cwd(), event.path);
      if (srcPath !== path) return;
      debouncedMeasure();
    });
  });
}

async function measure(): Promise<void> {
  const code = await readFile(srcPath, "utf-8");
  const processedCode = srcPath.endsWith(".ts")
    ? ((
        await transform(code, {
          jsc: { target: "esnext", parser: { syntax: "typescript" } },
        })
      ).code ?? "")
    : code;

  const { code: minifiedCode = "" } = await minify(processedCode, {
    compress: true,
    mangle: true,
    sourceMap: false,
    module: true,
  });
  const size = await measureSize(minifiedCode);

  if (minifiedCode.length === lastLength && size === lastSize) return;

  if (watch) {
    console.clear();
  }

  const lengthDiff =
    lastLength === undefined ? 0 : minifiedCode.length - lastLength;
  const sizeDiff = lastSize === undefined ? 0 : size - lastSize;

  console.log(`Last write: ${blue(new Date().toString())}`);
  console.log("");
  console.log("Source code:");
  console.log("");
  console.log(gray(minifiedCode));
  console.log("");
  console.log(`Length: ${blue(minifiedCode.length)} ${formatDiff(lengthDiff)}`);
  console.log("");
  console.log(
    `Size: ${blue(bytes(size, { decimalPlaces: 3 }))} ${formatDiff(sizeDiff)}`,
  );
  console.log("");

  lastLength = minifiedCode.length;
  lastSize = size;
}

function formatDiff(diff: number): string {
  if (diff === 0) return "";
  return diff > 0 ? red(`+${diff}`) : green(`${diff}`);
}

function measureSize(code: string): Promise<number> {
  return new Promise((resolve, reject) => {
    let size = 0;
    const stream = new Readable();
    stream.push(code);
    stream.push(null);

    const pipe = stream.pipe(
      createBrotliCompress({
        params: {
          [constants.BROTLI_PARAM_QUALITY]: 11,
        },
      }),
    );

    pipe.on("error", reject);
    pipe.on("data", (buf: Buffer) => {
      size += buf.length;
    });
    pipe.on("end", () => {
      resolve(size);
    });
  });
}

function debounce<TArgs extends unknown[]>(
  func: (...args: TArgs) => void,
  waitFor: number,
): (...args: TArgs) => void {
  let timeout: NodeJS.Timeout | undefined;

  return (...args: TArgs) => {
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, waitFor);
  };
}
