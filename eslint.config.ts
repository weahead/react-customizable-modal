import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  reactRefresh.configs.vite,
  {
    extends: ["js/recommended"],
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    plugins: { js },
    rules: {
      // your desired TS/React rules (feel free to edit)
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],

      // React-specific stylistic choices you might want
      "react/react-in-jsx-scope": "off", // not needed with new JSX transform
      "react/jsx-uses-react": "off",
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // --- global ignore patterns (same as .eslintignore)
  globalIgnores(["dist", "node_modules", "example"]),
]);
