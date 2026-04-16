import AppLayout from '../components/AppLayout'
import { LandingComingSoon } from '../components/landing/LandingComingSoon'
import { LandingCTA } from '../components/landing/LandingCTA'
import { LandingFeatureCards } from '../components/landing/LandingFeatureCards'
import { LandingHero } from '../components/landing/LandingHero'
import { LandingPrivacy } from '../components/landing/LandingPrivacy'

export default function LandingPage() {
  return (
    <AppLayout>
      <LandingHero />
      <LandingFeatureCards />
      <LandingComingSoon />
      <LandingPrivacy />
      <LandingCTA />
    </AppLayout>
  )
}
