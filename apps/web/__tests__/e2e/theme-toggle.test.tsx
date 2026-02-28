import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

const setTheme = vi.fn()

vi.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'light', setTheme }),
}))

import { ThemeToggle } from '@/components/theme-toggle'

describe('theme toggle e2e', () => {
  it('toggles from light to dark on click', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    await user.click(screen.getByRole('button', { name: 'Toggle theme' }))
    expect(setTheme).toHaveBeenCalledWith('dark')
  })
})
