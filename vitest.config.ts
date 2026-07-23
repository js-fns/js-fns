import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["**/node_modules", ".git", "./pkgs/core/**/*"],
    isolate: false,
    passWithNoTests: true,
    testTimeout: 100,
  },
});
