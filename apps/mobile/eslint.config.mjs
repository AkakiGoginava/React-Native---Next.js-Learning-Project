import { baseConfig } from "@pickup/eslint-config";
import expoConfig from "eslint-config-expo/flat.js";
import { defineConfig } from "eslint/config";

const eslintConfig = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  ...baseConfig,
]);

export default eslintConfig;
