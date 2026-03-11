import watcher from "@parcel/watcher";
import { glob } from "glob";
import { minimatch } from "minimatch";
import fs from "node:fs/promises";
import path from "node:path";

const watch = !!process.argv.find((arg) => arg === "--watch");

const srcRegExp = /^src\//;
const patterns = ["src/**/*.d.ts", "package.json", "*.md"];

if (watch) {
  const debouncedCopy = debounceByArgs(copy, 100);

  await watcher.subscribe(process.cwd(), (error, events) => {
    if (error) {
      console.error("The filesystem watcher encountered an error:");
      console.error(error);
      process.exit(1);
    }

    events.forEach((event) => {
      if (event.type !== "create" && event.type !== "update") return;
      const filePath = path.relative(process.cwd(), event.path);
      if (!patterns.some((pattern) => minimatch(filePath, pattern))) return;
      debouncedCopy(filePath);
    });
  });
} else {
  await glob(patterns).then((paths) => Promise.all(paths.map(copy)));
}

async function copy(filePath: string) {
  const distDir = srcRegExp.test(filePath)
    ? filePath.replace(/^src/, "dist")
    : path.join("dist", filePath);
  const dir = path.dirname(distDir);
  await fs.mkdir(dir, { recursive: true });
  await fs.copyFile(filePath, distDir);
  console.log(`Copied ${filePath} to ${distDir}`);
}

export function debounceByArgs<Fn extends (...args: any[]) => any>(
  func: Fn,
  waitFor: number,
) {
  const timeouts: Record<string, NodeJS.Timeout> = {};

  return (...args: unknown[]) => {
    const argsKey = JSON.stringify(args);
    const later = () => {
      delete timeouts[argsKey];
      func(...args);
    };
    clearTimeout(timeouts[argsKey]);
    timeouts[argsKey] = setTimeout(later, waitFor);
  };
}
