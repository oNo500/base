import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/features/example/hero-section'
import { MainContent } from '@/features/example/main-content'

export default function Home() {
  return (
    <>
      <Navbar />
      <MainContent>
        <HeroSection />
      </MainContent>
    </>
  )
}
