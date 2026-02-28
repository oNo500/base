'use client'

import { Button } from '@workspace/ui/components/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

function noop() {
  // noop
}
function subscribe() {
  return noop
}
function getTrue() {
  return true
}
function getFalse() {
  return false
}

function useIsMounted() {
  return useSyncExternalStore(subscribe, getTrue, getFalse)
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useIsMounted()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      disabled={!mounted}
    >
      {mounted && (resolvedTheme === 'dark'
        ? <Sun className="size-4" aria-hidden="true" />
        : <Moon className="size-4" aria-hidden="true" />
      )}
    </Button>
  )
}
