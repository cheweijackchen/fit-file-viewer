import { defineRouting } from 'next-intl/routing'

export const LOCALES = ['en-US', 'zh-TW'] as const
export type Locale = typeof LOCALES[number]
export const DEFAULT_LOCALE: Locale = 'en-US'

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
})
