import { Github } from '@workspace/icons'
import { Button } from '@workspace/ui/components/button'
import Link from 'next/link'

import { Logo } from '@/components/logo'
import { appPaths } from '@/config/app-paths'
import { env } from '@/config/env'

import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href={appPaths.home.href}
          className="flex items-center gap-2 text-foreground"
          aria-label={env.NEXT_PUBLIC_APP_NAME}
        >
          <Logo />
          <span className="text-sm font-semibold">{env.NEXT_PUBLIC_APP_NAME}</span>
        </Link>
        <div className="flex items-center gap-1">
          <Button
            render={<a href="https://github.com/oNo500/base" target="_blank" rel="noopener noreferrer" />}
            variant="ghost"
            size="icon"
            aria-label="GitHub"
          >
            <Github className="size-4" aria-hidden="true" />
          </Button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
