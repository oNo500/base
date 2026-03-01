import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/config/env', () => ({
  env: {
    NEXT_PUBLIC_APP_NAME: 'Test App',
  },
}))

vi.mock('@/config/app-paths', () => ({
  appPaths: {
    home: { href: '/' },
    auth: { login: { getHref: () => '/login' } },
  },
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock('@/lib/auth-client', () => ({
  authClient: {
    useSession: () => ({ data: null, isPending: true }),
  },
}))

import { RootLayout } from '@/components/root-layout'

describe('root layout', () => {
  it('renders all layout landmarks', () => {
    render(<RootLayout><div /></RootLayout>)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders children in main', () => {
    render(<RootLayout><p>content</p></RootLayout>)
    expect(screen.getByRole('main')).toContainElement(screen.getByText('content'))
  })
})
