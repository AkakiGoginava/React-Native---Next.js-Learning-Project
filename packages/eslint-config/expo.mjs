import { default as baseExpoConfig } from "eslint-config-expo/flat.js";
import { defineConfig } from "eslint/config";
import baseConfig from "./base.mjs";

const expoConfig = defineConfig([
  ...baseExpoConfig,
  {
    ignores: ["dist/*"],
  },
  ...baseConfig,
]);

export default expoConfig;
