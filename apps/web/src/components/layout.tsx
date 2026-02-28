import { ErrorBoundary } from '@/components/error-boundary'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <ErrorBoundary>
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  )
}
