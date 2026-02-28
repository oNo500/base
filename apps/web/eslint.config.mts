import { composeConfig } from "@workspace/eslint-config";

import type { Linter } from "eslint";

const config: Linter.Config[] = composeConfig({
  typescript: { tsconfigRootDir: import.meta.dirname },
  imports: {
    typescript: true,
  },
  nextjs: true,
  react: true,
  unicorn: true,
  stylistic: true,
});

export default config;
