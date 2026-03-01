import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import type { auth } from '@/lib/auth'

type Session = typeof auth.$Infer.Session

export function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Navbar initialSession={session} />
      <main id="main-content" className="h-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}
