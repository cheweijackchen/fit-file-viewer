import { LandingFeatureCards } from './components/landing/LandingFeatureCards'
import { LandingHeader } from './components/landing/LandingHeader'
import { LandingHero } from './components/landing/LandingHero'

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <LandingHero />
      <LandingFeatureCards />
    </>
  )
}
