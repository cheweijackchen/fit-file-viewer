'use client'

import { Button, Menu } from '@mantine/core'
import { IconWorld } from '@tabler/icons-react'
import { useLocale } from 'next-intl'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from '@/i18n/navigation'
import { LOCALES, type Locale } from '@/i18n/routing'

const LOCALE_LABELS: Record<Locale, string> = {
  'en-US': 'English',
  'zh-TW': '中文（繁體）',
}

const LOCALE_STORAGE_KEY = 'locale'

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null)

  useEffect(() => {
    if (pendingLocale === null) {
      return
    }
    localStorage.setItem(LOCALE_STORAGE_KEY, pendingLocale)
    document.cookie = `NEXT_LOCALE=${pendingLocale}; path=/; max-age=${60 * 60 * 24 * 7}`
  }, [pendingLocale])

  function switchLocale(target: Locale) {
    setPendingLocale(target)
    router.push(pathname, { locale: target })
  }

  return (
    <Menu>
      <Menu.Target>
        <Button
          variant="subtle"
          color="bright"
          leftSection={<IconWorld size={16} />}
          size="sm"
          className="light-hover-effect"
        >
          {LOCALE_LABELS[locale]}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {LOCALES.map(loc => (
          <Menu.Item
            key={loc}
            fw={locale === loc ? 600 : undefined}
            onClick={() => switchLocale(loc)}
          >
            {LOCALE_LABELS[loc]}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
