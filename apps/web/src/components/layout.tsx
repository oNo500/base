import { ErrorBoundary } from '@/components/error-boundary'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      <Navbar />
      <ErrorBoundary>
        <main id="main-content" className="h-full">
          {children}
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  )
}
