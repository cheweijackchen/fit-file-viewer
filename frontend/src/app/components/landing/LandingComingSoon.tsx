'use client'

import { Badge, Card, Container, Text, Title } from '@mantine/core'
import { IconMapPin, IconRepeat, IconSparkles, IconSunWind, IconTrendingUp } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import type { ComponentType, CSSProperties } from 'react'

interface CardConfig {
  key: string
  icon: ComponentType<{ size: number; style?: CSSProperties }>
  iconColor: string
  iconBgClass: string
}

const cardConfigs: CardConfig[] = [
  {
    key: 'trail-planner',
    icon: IconMapPin,
    iconColor: 'var(--mantine-color-yellow-5)',
    iconBgClass: 'bg-(--mantine-color-yellow-1)/90',
  },
  {
    key: 'elevation-analyzer',
    icon: IconTrendingUp,
    iconColor: 'var(--mantine-color-orange-4)',
    iconBgClass: 'bg-(--mantine-color-orange-1)/40',
  },
  {
    key: 'weather-overlay',
    icon: IconSunWind,
    iconColor: 'var(--mantine-color-cyan-6)',
    iconBgClass: 'bg-(--mantine-color-cyan-1)/40',
  },
  {
    key: 'gpx-converter',
    icon: IconRepeat,
    iconColor: 'var(--mantine-color-green-6)',
    iconBgClass: 'bg-(--mantine-color-green-2)/20',
  },
]

export function LandingComingSoon() {
  const t = useTranslations('landing')

  return (
    <section className="py-20 bg-(--mantine-color-gray-0) dark:bg-(--mantine-color-dark-5)">
      <Container size="xl">
        <div className="flex flex-col items-center text-center gap-3">
          <Badge
            color="orange"
            variant="light"
            size="lg"
            radius="xl"
            leftSection={<IconSparkles size={14} />}
            styles={{ root: { textTransform: 'none' } }}
          >
            {t('coming-soon.badge')}
          </Badge>

          <Title
            order={2}
            c="bright"
            className="text-4xl! max-md:text-3xl!"
            style={{ letterSpacing: -0.5 }}
          >
            {t('coming-soon.title')}
          </Title>

          <Text
            c="dimmed"
            size="lg"
          >
            {t('coming-soon.description')}
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {cardConfigs.map(card => (
            <Card
              key={card.key}
              withBorder
              radius="lg"
              shadow="sm"
              p="xl"
            >
              <div className="flex flex-col gap-4">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl ${card.iconBgClass}`}
                >
                  <card.icon
                    size={24}
                    style={{ color: card.iconColor }}
                  />
                </div>

                <Text
                  fw={600}
                  size="lg"
                  style={{ letterSpacing: -0.2 }}
                >
                  {t(`coming-soon.cards.${card.key}.title`)}
                </Text>

                <Text
                  c="dimmed"
                  size="sm"
                  style={{ lineHeight: 1.5 }}
                >
                  {t(`coming-soon.cards.${card.key}.description`)}
                </Text>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
