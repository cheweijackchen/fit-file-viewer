import { LandingComingSoon } from '../components/landing/LandingComingSoon'
import { LandingCTA } from '../components/landing/LandingCTA'
import { LandingFeatureCards } from '../components/landing/LandingFeatureCards'
import { LandingFooter } from '../components/landing/LandingFooter'
import { LandingHeader } from '../components/landing/LandingHeader'
import { LandingHero } from '../components/landing/LandingHero'
import { LandingPrivacy } from '../components/landing/LandingPrivacy'

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <LandingHero />
      <LandingFeatureCards />
      <LandingComingSoon />
      <LandingPrivacy />
      <LandingCTA />
      <LandingFooter />
    </>
  )
}
