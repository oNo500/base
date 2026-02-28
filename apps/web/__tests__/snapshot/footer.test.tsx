import { render } from '@testing-library/react'
import { beforeAll, afterAll, describe, it, vi } from 'vitest'

vi.mock('@/config/env', () => ({
  env: {
    NEXT_PUBLIC_APP_NAME: 'Test App',
  },
}))

beforeAll(() => {
  vi.setSystemTime(new Date('2026-01-01'))
})

afterAll(() => {
  vi.useRealTimers()
})

import { Footer } from '@/components/footer'

describe('Footer snapshot', () => {
  it('matches snapshot', () => {
    const { container } = render(<Footer />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
