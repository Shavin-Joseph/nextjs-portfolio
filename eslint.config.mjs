import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // This line includes all the default, recommended rules from Next.js.
  // KEEP THIS.
  ...compat.extends("next/core-web-vitals"),

  // This block tells ESLint which folders to ignore.
  // KEEP THIS.
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },

  // ==================================================================
  // --- ADD THIS NEW OBJECT TO THE ARRAY ---
  // This is where we add our custom rules.
  {
    rules: {
      // This rule turns OFF the error about apostrophes and quotes,
      // which is what was causing your build to fail.
      "react/no-unescaped-entities": "off",
    },
  },
  // ==================================================================
];

export default eslintConfig;