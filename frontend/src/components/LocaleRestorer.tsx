'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { LOCALES, type Locale } from '@/i18n/routing'

const LOCALE_STORAGE_KEY = 'locale'

export function LocaleRestorer() {
  const router = useRouter()

  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (!saved || !(LOCALES as readonly string[]).includes(saved)) {
      return
    }

    const locale = saved as Locale
    const cookieLocale = document.cookie
      .split('; ')
      .find(row => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1]

    if (!cookieLocale) {
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 7}`
      router.replace(`/${locale}`)
    }
  }, [router])

  return null
}
