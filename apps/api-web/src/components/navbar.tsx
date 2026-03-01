'use client'

import { Github } from '@workspace/icons'
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@workspace/ui/components/navigation-menu'
import { Separator } from '@workspace/ui/components/separator'
import { Skeleton } from '@workspace/ui/components/skeleton'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Logo } from '@/components/logo'
import { appPaths } from '@/config/app-paths'
import { env } from '@/config/env'
import { authClient } from '@/lib/auth-client'

import type { auth } from '@/lib/auth'

type Session = typeof auth.$Infer.Session

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

export function Navbar({ initialSession }: { initialSession: Session | null }) {
  // initialSession 来自服务端，作为初始值；useSession 在后台同步（处理登出等状态变化）
  const { data: clientSession } = authClient.useSession()
  const session = clientSession ?? initialSession
  const router = useRouter()
  async function handleSignOut() {
    await authClient.signOut()
    router.push(appPaths.auth.login.getHref())
  }

  return (
    <header className="border-b border-border">
      <div className="container py-3.5">
        <div className="flex items-center justify-between">

          {/* Left: logo + desktop nav */}
          <div className="flex items-center gap-6">
            <Link
              href={appPaths.home.href}
              className="flex items-center gap-2 text-foreground"
              aria-label={env.NEXT_PUBLIC_APP_NAME}
            >
              <Logo />
              <span className="text-sm font-semibold">{env.NEXT_PUBLIC_APP_NAME}</span>
            </Link>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {navItems.map((item) =>
                  item.children
                    ? (
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
                      )
                    : (
                        <NavigationMenuItem key={item.label}>
                          <NavigationMenuLink
                            render={<Link href={item.href} />}
                            className="px-2.5 py-1.5 text-sm font-medium"
                          >
                            {item.label}
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ),
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop: right side actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              render={<a href="https://github.com/oNo500/base" target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              variant="ghost"
              size="icon"
              aria-label="GitHub"
            >
              <Github className="size-4" aria-hidden="true" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={(
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    aria-label="User menu"
                  >
                    <Avatar className="size-7">
                      <AvatarImage src={session?.user.image ?? undefined} alt={session?.user.name ?? ''} />
                      <AvatarFallback className="bg-transparent p-0">
                        <Skeleton className="size-full rounded-full" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                )}
              />
              <DropdownMenuContent align="end">
                {session
                  ? (
                      <>
                        <div className="px-2 py-1.5 text-sm max-w-48">
                          <div className="font-medium truncate">{session.user.name}</div>
                          <div className="text-muted-foreground truncate">{session.user.email}</div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                          Sign out
                        </DropdownMenuItem>
                      </>
                    )
                  : (
                      <DropdownMenuItem render={<Link href={appPaths.auth.login.getHref()} />}>
                        Login
                      </DropdownMenuItem>
                    )}
              </DropdownMenuContent>
            </DropdownMenu>
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
                    item.children
                      ? (
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
                        )
                      : (
                          <DrawerClose key={item.label} asChild>
                            <Link
                              href={item.href}
                              className="rounded-lg px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                            >
                              {item.label}
                            </Link>
                          </DrawerClose>
                        ),
                  )}
                </nav>
                <Separator />
                <div className="p-4">
                  {session
                    ? (
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="size-8">
                              <AvatarImage src={session.user.image ?? undefined} alt={session.user.name} />
                              <AvatarFallback className="bg-transparent p-0">
                                <Skeleton className="size-full rounded-full" />
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
                      )
                    : (
                        <DrawerClose asChild>
                          <Button size="sm" nativeButton={false} render={<Link href={appPaths.auth.login.getHref()} />} className="w-full">
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
    </header>
  )
}
