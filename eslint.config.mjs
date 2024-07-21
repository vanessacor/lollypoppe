import eslintPluginAstro from "eslint-plugin-astro";
export default [
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: ["node_modules/", "dist/**", "**/types.d.ts"],
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
];
