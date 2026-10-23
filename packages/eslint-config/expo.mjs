import { default as baseExpoConfig } from "eslint-config-expo/flat.js";
import { defineConfig } from "eslint/config";
import baseConfig from "./base.mjs";

const expoConfig = defineConfig([
  ...baseExpoConfig,
  {
    ignores: ["dist/*"],
  },
  ...baseConfig, // KEEP PLACED LAST - override default configs.
]);

export default expoConfig;
