import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

const baseConfig = defineConfig([
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      eslintConfigPrettier,
    ],
  },
]);

export default baseConfig;
