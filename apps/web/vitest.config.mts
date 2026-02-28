import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const sharedConfig = {
  plugins: [tsconfigPaths(), react()],
}

const sharedTestConfig = {
  globals: true,
  setupFiles: ['./__tests__/setup.ts'],
  environment: 'jsdom' as const,
}

export default defineConfig({
  ...sharedConfig,
  test: {
    projects: [
      {
        ...sharedConfig,
        test: {
          ...sharedTestConfig,
          name: 'unit',
          include: ['__tests__/unit/**/*.test.tsx'],
        },
      },
      {
        ...sharedConfig,
        test: {
          ...sharedTestConfig,
          name: 'integration',
          include: ['__tests__/integration/**/*.test.tsx'],
          testTimeout: 10000,
        },
      },
      {
        ...sharedConfig,
        test: {
          ...sharedTestConfig,
          name: 'snapshot',
          include: ['__tests__/snapshot/**/*.test.tsx'],
        },
      },
      {
        ...sharedConfig,
        test: {
          ...sharedTestConfig,
          name: 'e2e',
          include: ['__tests__/e2e/**/*.test.tsx'],
          testTimeout: 15000,
        },
      },
    ],
  },
})
