import { Github } from '@workspace/icons'
import { Button } from '@workspace/ui/components/button'
import Link from 'next/link'

import { Container } from '@/components/container'
import { Logo } from '@/components/logo'
import { appPaths } from '@/config/app-paths'
import { env } from '@/config/env'

import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  return (
    <header className="border-b border-border">
      <Container>
        <div className="col-start-1 col-end-4 flex items-center">
          <Link
            href={appPaths.home.href}
            className="flex items-center gap-2 text-foreground"
            aria-label={env.NEXT_PUBLIC_APP_NAME}
          >
            <Logo />
            <span className="text-sm font-semibold">{env.NEXT_PUBLIC_APP_NAME}</span>
          </Link>
        </div>
        <div className="col-start-7 col-end-9 flex items-center justify-end gap-1">
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
      </Container>
    </header>
  )
}
