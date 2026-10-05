import { FitFileViewerHeaderCta } from './FitFileViewerHeaderCta'
import { AppHeaderCtaProvider } from '../../components/AppHeaderCtaContext'
import AppLayout from '../../components/AppLayout'

export default function FitFileViewerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppHeaderCtaProvider cta={<FitFileViewerHeaderCta />}>
      <AppLayout>
        {children}
      </AppLayout>
    </AppHeaderCtaProvider>
  )
}
