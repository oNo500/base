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
  },
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'light', setTheme: vi.fn() }),
}))

import { Navbar } from '@/components/navbar'

describe('Navbar', () => {
  it('renders app name', () => {
    render(<Navbar />)
    expect(screen.getByText('Test App')).toBeInTheDocument()
  })

  it('renders home link', () => {
    render(<Navbar />)
    const homeLink = screen.getByRole('link', { name: 'Test App' })
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('renders GitHub link', () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: 'GitHub' })).toBeInTheDocument()
  })
})
