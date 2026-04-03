'use client'

import { Badge, Container, Title } from '@mantine/core'
import { IconShieldCheck } from '@tabler/icons-react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

interface StatConfig {
  key: string
  valueClass: string
}

const statConfigs: StatConfig[] = [
  { key: 'processing', valueClass: 'text-(--mantine-color-yellow-4)' },
  { key: 'uploaded', valueClass: 'text-(--mantine-color-orange-4)' },
  { key: 'account', valueClass: 'text-(--mantine-color-cyan-2)' },
  { key: 'openSource', valueClass: 'text-(--mantine-color-green-1)' },
]

export function LandingPrivacy() {
  const t = useTranslations('landing')

  return (
    <section className="py-20 bg-(--mantine-color-dark-9)">
      <Container size="xl">
        <div className="flex flex-col items-center text-center gap-3">
          <Badge
            variant="light"
            size="lg"
            radius="xl"
            leftSection={<IconShieldCheck size={14} />}
            styles={{
              root: {
                textTransform: 'none',
                '--badge-bg': 'rgba(217, 180, 74, 0.2)',
                '--badge-color': 'var(--mantine-color-yellow-0)',
              },
            }}
          >
            {t('privacy.badge')}
          </Badge>

          <Title
            order={2}
            className="text-4xl! max-md:text-3xl! max-w-200 text-center text-(--mantine-color-white)"
            style={{ letterSpacing: -0.5 }}
          >
            {t('privacy.title')}
          </Title>

          <p className="text-lg text-(--mantine-color-dark-2)">
            {t('privacy.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {statConfigs.map(stat => (
            <div
              key={stat.key}
              className="flex flex-col items-center gap-2 p-6 bg-white/4 border border-white/7 rounded-(--mantine-radius-lg)"
            >
              <span
                className={clsx('text-3xl font-bold', stat.valueClass)}
                style={{ letterSpacing: -1 }}
              >
                {t(`privacy.stats.${stat.key}.value`)}
              </span>

              <span className="text-sm font-medium text-center text-(--mantine-color-dark-2)">
                {t(`privacy.stats.${stat.key}.label`)}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
