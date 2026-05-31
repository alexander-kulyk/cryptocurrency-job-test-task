import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// `eslint-config-next` already registers the `import` plugin, so we only
// enable the rules we need (re-registering the plugin throws in flat config).
export default defineConfig([
  {
    // Tooling configs and ambient declaration files are not application
    // source and should not be graded by the app rules below.
    ignores: [
      "eslint.config.mjs",
      "jest.config.ts",
      "tailwind.config.ts",
      "**/*.d.ts",
      ".next/**",
    ],
  },
  {
    extends: [...nextCoreWebVitals, ...nextTypescript],

    rules: {
      "@typescript-eslint/no-explicit-any": "off",

      "import/no-internal-modules": ["error", {
        allow: [
          "**/index.ts",
          "next/server",
          "next/navigation",
          "next/image",
          "@reduxjs/toolkit/query/react",
          "@reduxjs/toolkit/query",
          "next-intl/middleware",
          "next-intl/routing",
          "next-intl/server",
          "next-intl/navigation",
          "next/font/google",
          "/styles/globals.css",
          "next-intl/plugin",
          "next/constants.js",
        ],
      }],
    },
  },
  {
    files: ["**/index.ts", "**/index.tsx"],

    rules: {
      "import/no-internal-modules": "off",
    },
  },
]);
