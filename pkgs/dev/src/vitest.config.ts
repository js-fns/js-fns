import { defineConfig } from "vitest/config";

export const vitestConfig = defineConfig({
  test: {
    isolate: false,
    passWithNoTests: true,
    testTimeout: 100,
  },
});

export default vitestConfig;
