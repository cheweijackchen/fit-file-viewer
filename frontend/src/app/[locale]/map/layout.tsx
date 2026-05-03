import { MapHeaderCta } from './components/MapHeaderCta'
import { AppHeaderCtaProvider } from '../../components/AppHeaderCtaContext'

export default function MapPageLayout({ children }: { children: React.ReactNode; }) {
  return (
    <AppHeaderCtaProvider cta={<MapHeaderCta />}>
      {children}
    </AppHeaderCtaProvider>
  )
}
