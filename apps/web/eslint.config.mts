import { GLOB_TESTS } from "@workspace/eslint-config";
import { composeConfig } from "@workspace/eslint-config";

import type { Linter } from "eslint";

const config: Linter.Config[] = [
  ...composeConfig({
    typescript: { tsconfigRootDir: import.meta.dirname },
    imports: {
      typescript: true,
    },
    nextjs: true,
    react: true,
    unicorn: true,
    stylistic: true,
    vitest: true,
  }),
  {
    files: GLOB_TESTS,
    rules: {
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
];

export default config;
