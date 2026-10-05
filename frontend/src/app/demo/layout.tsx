import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { DemoShell } from './components/DemoShell'

interface DemoLayoutProps {
  children: React.ReactNode;
}

export default async function DemoLayout({ children }: DemoLayoutProps) {
  const messages = await getMessages({ locale: 'en-US' })

  return (
    <NextIntlClientProvider
      locale="en-US"
      messages={messages}
    >
      <DemoShell>
        {children}
      </DemoShell>
    </NextIntlClientProvider>
  )
}
