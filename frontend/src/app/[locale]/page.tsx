import AppLayout from '../components/AppLayout'
import { LandingComingSoon } from '../components/landing/LandingComingSoon'
import { LandingCTA } from '../components/landing/LandingCTA'
import { LandingFeatureCards } from '../components/landing/LandingFeatureCards'
import { LandingHero } from '../components/landing/LandingHero'
import { LandingWhyTrailKit } from '../components/landing/LandingWhyTrailKit'

export default function LandingPage() {
  return (
    <AppLayout>
      <LandingHero />
      <LandingFeatureCards />
      <LandingComingSoon />
      <LandingWhyTrailKit />
      <LandingCTA />
    </AppLayout>
  )
}
