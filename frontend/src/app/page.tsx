import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/i18n/routing'

function detectLocale(acceptLanguage: string): Locale {
  const languages = acceptLanguage.split(',').map(l => l.split(';')[0].trim())
  for (const lang of languages) {
    const match = LOCALES.find(locale =>
      locale.toLowerCase() === lang.toLowerCase() ||
      locale.split('-')[0].toLowerCase() === lang.toLowerCase()
    )
    if (match) {
      return match
    }
  }
  return DEFAULT_LOCALE
}

export default async function RootPage() {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value

  if (cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale)) {
    redirect(`/${cookieLocale}`)
  }

  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') ?? ''
  redirect(`/${detectLocale(acceptLanguage)}`)
}
