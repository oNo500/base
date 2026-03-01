import { headers } from 'next/headers'

import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { auth } from '@/lib/auth'

export async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() })

  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      <Navbar initialSession={session} />
      <main id="main-content" className="h-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}
