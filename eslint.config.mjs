import eslintPluginAstro from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
export default [
  // An object with only `ignores` makes these global ignores
  {
    ignores: ["node_modules/", "dist/", ".astro/", "**/types.d.ts"],
  },
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      eqeqeq: "error",
      "max-len": [
        "error",
        {
          tabWidth: 4,
          code: 100,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      "no-console": ["error", { allow: ["info", "warn", "error"] }],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { "@typescript-eslint": tsPlugin },
    rules: {
      "no-unused-vars": "error",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
];
