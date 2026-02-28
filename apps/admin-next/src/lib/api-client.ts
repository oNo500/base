import { createClient } from '@infra-x/fwrap'

import type { RequestOptions } from '@infra-x/fwrap'

export const api = createClient({
//   prefixUrl:,
  timeout: 30_000,
  retry: {
    limit: 2,
    methods: ['GET', 'PUT', 'HEAD', 'DELETE', 'OPTIONS', 'TRACE'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  onRequest: [
    async (request) => {
      if (globalThis.window === undefined) {
        const { cookies } = await import('next/headers')
        const cookieStore = await cookies()
        const cookieHeader = cookieStore.toString()
        if (cookieHeader) {
          request.headers.set('Cookie', cookieHeader)
        }
      }
      return request
    },
  ],
})

export interface ApiOptions extends Omit<RequestOptions, 'prefixUrl'> {
  next?: {
    revalidate?: number
    tags?: string[]
  }
}
