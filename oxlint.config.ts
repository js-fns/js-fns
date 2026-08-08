import { oxlintConfig } from "@js-fns/dev/config/oxlint";
import { defineConfig } from "oxlint";

export default defineConfig({
  ...oxlintConfig,

  ignorePatterns: ["pkgs/core/src/**/*"],
});
