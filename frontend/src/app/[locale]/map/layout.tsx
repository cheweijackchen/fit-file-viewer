import { MapHeaderCta } from './components/MapHeaderCta'
import { MapShellLayout } from './components/MapShellLayout'
import { AppHeaderCtaProvider } from '../../components/AppHeaderCtaContext'

export default function MapPageLayout({ children }: { children: React.ReactNode; }) {
  return (
    <AppHeaderCtaProvider cta={<MapHeaderCta />}>
      <MapShellLayout>
        {children}
      </MapShellLayout>
    </AppHeaderCtaProvider>
  )
}
