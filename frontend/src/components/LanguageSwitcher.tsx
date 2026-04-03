'use client'

import { Button, Menu } from '@mantine/core'
import { IconChevronDown, IconWorld } from '@tabler/icons-react'
import { useLocale } from 'next-intl'
import { LOCALES, type Locale } from '@/i18n/routing'
import { use } from 'react'
import { useRouter } from 'next/navigation'

const LOCALE_LABELS: Record<Locale, string> = {
  'en-US': 'English',
  'zh-TW': '中文（繁體）',
}

const LOCALE_STORAGE_KEY = 'locale'

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()

  function switchLocale(target: Locale) {
    localStorage.setItem(LOCALE_STORAGE_KEY, target)
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=${60 * 60 * 24 * 7}`
    router.push(`/${target}`)
  }

  return (
    <Menu>
      <Menu.Target>
        <Button
          variant="subtle"
          color="bright"
          leftSection={<IconWorld size={16} />}
          rightSection={<IconChevronDown size={14} />}
          size="sm"
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
