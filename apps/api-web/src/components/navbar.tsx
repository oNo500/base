'use client'

import { Github } from '@workspace/icons'
import { Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar'
import { Button } from '@workspace/ui/components/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@workspace/ui/components/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import { ThemeSwitcher } from '@workspace/ui/components/kibo-ui/theme-switcher'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@workspace/ui/components/navigation-menu'
import { Separator } from '@workspace/ui/components/separator'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'

import { Logo } from '@/components/logo'
import { appPaths } from '@/config/app-paths'
import { env } from '@/config/env'
import { authClient } from '@/lib/auth-client'

const navItems = [
  {
    label: 'Products',
    children: [
      { label: 'API Platform', href: appPaths.home.href, description: 'Build and manage your APIs' },
      { label: 'Analytics', href: appPaths.home.href, description: 'Insights and monitoring' },
    ],
  },
  { label: 'Docs', href: appPaths.home.href },
  { label: 'Pricing', href: appPaths.home.href },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const { data: session } = authClient.useSession()
  const router = useRouter()

  async function handleSignOut() {
    await authClient.signOut()
    router.push(appPaths.auth.login.getHref())
  }

  return (
    <header className="border-b border-border">
      <div className="container py-3.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link
              href={appPaths.home.href}
              className="flex items-center gap-2 text-foreground"
              aria-label={env.NEXT_PUBLIC_APP_NAME}
            >
              <Logo />
              <span className="text-sm font-semibold">{env.NEXT_PUBLIC_APP_NAME}</span>
            </Link>

            {/* Desktop navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {navItems.map((item) =>
                  item.children ? (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-48 gap-1 p-1">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <NavigationMenuLink
                                render={<Link href={child.href} />}
                                className="flex flex-col gap-0.5"
                              >
                                <span className="font-medium">{child.label}</span>
                                <span className="text-xs text-muted-foreground">{child.description}</span>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuLink
                        render={<Link href={item.href!} />}
                        className="px-2.5 py-1.5 text-sm font-medium"
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Button
              render={<a href="https://github.com/oNo500/base" target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              variant="ghost"
              size="icon"
              aria-label="GitHub"
            >
              <Github className="size-4" aria-hidden="true" />
            </Button>

            {/* Desktop: user dropdown or login */}
            <div className="hidden md:flex items-center gap-2">
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
                        <Avatar className="size-7">
                          <AvatarImage src={session.user.image ?? undefined} alt={session.user.name} />
                          <AvatarFallback className="text-xs">
                            {session.user.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end">
                    <div className="px-2 py-1.5 text-sm">
                      <div className="font-medium">{session.user.name}</div>
                      <div className="text-muted-foreground">{session.user.email}</div>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="px-2 py-1.5 flex items-center justify-between gap-2">
                      <span className="text-sm">Theme</span>
                      <ThemeSwitcher
                        value={theme as 'light' | 'dark' | 'system'}
                        onChange={setTheme}
                      />
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="sm" render={<Link href={appPaths.auth.login.getHref()} />}>
                  Login
                </Button>
              )}
            </div>

            {/* Mobile: hamburger + drawer */}
            <div className="md:hidden">
              <Drawer direction="left">
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu className="size-4" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="border-b border-border">
                    <DrawerTitle asChild>
                      <Link
                        href={appPaths.home.href}
                        className="flex items-center gap-2 text-foreground"
                      >
                        <Logo />
                        <span className="text-sm font-semibold">{env.NEXT_PUBLIC_APP_NAME}</span>
                      </Link>
                    </DrawerTitle>
                  </DrawerHeader>
                  <nav className="flex flex-col gap-1 p-4">
                    {navItems.map((item) =>
                      item.children ? (
                        <div key={item.label} className="flex flex-col gap-1">
                          <span className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {item.label}
                          </span>
                          {item.children.map((child) => (
                            <DrawerClose key={child.label} asChild>
                              <Link
                                href={child.href}
                                className="rounded-lg px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                              >
                                {child.label}
                              </Link>
                            </DrawerClose>
                          ))}
                        </div>
                      ) : (
                        <DrawerClose key={item.label} asChild>
                          <Link
                            href={item.href!}
                            className="rounded-lg px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                          >
                            {item.label}
                          </Link>
                        </DrawerClose>
                      )
                    )}
                  </nav>
                  <Separator />
                  <div className="p-4">
                    {session ? (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-8">
                            <AvatarImage src={session.user.image ?? undefined} alt={session.user.name} />
                            <AvatarFallback className="text-xs">
                              {session.user.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{session.user.name}</span>
                            <span className="text-xs text-muted-foreground">{session.user.email}</span>
                          </div>
                        </div>
                        <DrawerClose asChild>
                          <Button variant="outline" size="sm" onClick={handleSignOut} className="w-full">
                            Sign out
                          </Button>
                        </DrawerClose>
                      </div>
                    ) : (
                      <DrawerClose asChild>
                        <Button size="sm" render={<Link href={appPaths.auth.login.getHref()} />} className="w-full">
                          Login
                        </Button>
                      </DrawerClose>
                    )}
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
