import { render, screen, act } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'light', setTheme: vi.fn() }),
}))

import { ThemeToggle } from '@/components/theme-toggle'

describe('ThemeToggle', () => {
  it('renders toggle button', async () => {
    await act(async () => {
      render(<ThemeToggle />)
    })
    expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeInTheDocument()
  })
})
