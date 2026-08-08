import { defineConfig } from "oxlint";

export const oxlintConfig = defineConfig({
  rules: {
    // Disallow circular dependencies (except for types).
    "import/no-cycle": "error",
  },

  options: {
    typeAware: true,
    typeCheck: true,
  },

  env: {
    builtin: true,
  },
});

export default oxlintConfig;
