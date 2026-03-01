import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

export function RootLayout({
  children,
  navbar = <Navbar />,
}: {
  children: React.ReactNode
  navbar?: React.ReactNode
}) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      {navbar}
      <main id="main-content" className="h-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}
