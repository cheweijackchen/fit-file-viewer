import type { Metadata } from 'next'
import PeaksShell from './PeaksShell'

type Props = { params: Promise<{ locale: string; }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    manifest: `/manifests/peaks-${locale}.json`,
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: locale === 'zh-TW' ? '百岳紀錄' : 'Peaks Tracker',
    },
  }
}

export default function PeaksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PeaksShell>{children}</PeaksShell>
}
