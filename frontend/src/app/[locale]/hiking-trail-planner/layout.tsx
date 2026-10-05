import type { Metadata } from 'next'
import AppLayout from '../../components/AppLayout'

type Props = { params: Promise<{ locale: string; }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    manifest: `/manifests/hiking-${locale}.json`,
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: locale === 'zh-TW' ? '登山行程規劃' : 'Hiking Trail Planner',
    },
  }
}

export default function HikingTrailPlannerLayout({ children }: { children: React.ReactNode; }) {
  return <AppLayout>{children}</AppLayout>
}
