#!/usr/bin/env node

import { buildPackage } from "./build/package.ts";

const [, , command, packageDir = process.cwd()] = process.argv;

switch (command) {
  case "build":
    await buildPackage(packageDir);
    break;

  case undefined:
  case "help":
  case "--help":
  case "-h":
    printHelp();
    break;

  default:
    console.error(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
}

function printHelp() {
  console.log(
    `Usage: jsd <command> [packageDir]\n\nCommands:\n  build [packageDir]  Build a package`,
  );
}
