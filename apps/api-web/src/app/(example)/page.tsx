import { headers } from 'next/headers'

import { auth } from '@/lib/auth'
import { RootLayout } from '@/components/root-layout'
import { HeroSection } from '@/features/example/hero-section'

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() })
  return (
    <RootLayout session={session}>
      <HeroSection />
    </RootLayout>
  )
}
