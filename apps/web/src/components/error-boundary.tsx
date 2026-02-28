'use client'

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

import type { FallbackProps } from 'react-error-boundary'

function ErrorFallback({ error }: FallbackProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-foreground">Something went wrong.</p>
        <p className="text-xs text-muted-foreground">
          {error instanceof Error ? error.message : String(error)}
        </p>
      </div>
    </div>
  )
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  )
}
