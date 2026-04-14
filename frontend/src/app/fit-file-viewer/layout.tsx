import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { FitFileViewerHeaderCta } from './FitFileViewerHeaderCta'
import { AppHeaderCtaProvider } from '../components/AppHeaderCtaContext'
import AppLayout from '../components/AppLayout'

export default async function FitFileViewerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >
      <AppHeaderCtaProvider cta={<FitFileViewerHeaderCta />}>
        <AppLayout>
          {children}
        </AppLayout>
      </AppHeaderCtaProvider>
    </NextIntlClientProvider>
  )
}
