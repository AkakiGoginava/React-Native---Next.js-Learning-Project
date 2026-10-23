import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

const baseConfig = defineConfig([
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },
]);

export default baseConfig;
