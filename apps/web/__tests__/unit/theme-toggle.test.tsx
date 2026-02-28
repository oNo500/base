import { render, screen, act } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'light', setTheme: vi.fn() }),
}))

import { ThemeToggle } from '@/components/theme-toggle'

describe('theme toggle', () => {
  it('renders toggle button', () => {
    act(() => {
      render(<ThemeToggle />)
    })
    expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeInTheDocument()
  })
})
