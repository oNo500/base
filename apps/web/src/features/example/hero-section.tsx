import { Button } from '@workspace/ui/components/button'
import Link from 'next/link'

import { appPaths } from '@/config/app-paths'

export function HeroSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Build Something Minimal.
        </h1>
        <p className="text-pretty text-base text-muted-foreground sm:text-lg">
          A clean foundation. No noise, no bloat.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button render={<Link href={appPaths.auth.register.getHref()} />} size="lg">
            Get Started
          </Button>
          <Button render={<Link href={appPaths.auth.login.getHref()} />} variant="outline" size="lg">
            Sign In
          </Button>
        </div>
      </div>
    </section>
  )
}
