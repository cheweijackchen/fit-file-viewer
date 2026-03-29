import { LandingComingSoon } from './components/landing/LandingComingSoon'
import { LandingFeatureCards } from './components/landing/LandingFeatureCards'
import { LandingHeader } from './components/landing/LandingHeader'
import { LandingHero } from './components/landing/LandingHero'
import { LandingPrivacy } from './components/landing/LandingPrivacy'

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <LandingHero />
      <LandingFeatureCards />
      <LandingComingSoon />
      <LandingPrivacy />
    </>
  )
}
