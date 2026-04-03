'use client'

import { Badge, Card, Container, Text, Title } from '@mantine/core'
import { IconArrowRight, IconStack2 } from '@tabler/icons-react'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import watchImage from '@/assets/photos/garmin-955.webp'
import mountRainierImage from '@/assets/photos/mount-rainer-wilderness.webp'
import mountainPeaksImage from '@/assets/photos/mountain-and-lake.webp'
import classes from './LandingFeatureCards.module.scss'

interface CardConfig {
  key: string
  image: StaticImageData | null
  placeholderClass?: string
  badgeColor: string
  href: string
}

const cardConfigs: CardConfig[] = [
  {
    key: 'peaks-tracker',
    image: mountainPeaksImage,
    placeholderClass: classes.placeholderImage,
    badgeColor: 'yellow',
    href: '/peaks',
  },
  {
    key: 'fit-file-viewer',
    image: watchImage,
    badgeColor: 'orange',
    href: '/fit-file-viewer',
  },
  {
    key: 'trail-map',
    image: mountRainierImage,
    badgeColor: 'cyan',
    href: '/trail-map',
  },
]

export function LandingFeatureCards() {
  const t = useTranslations('landing')

  return (
    <section className="py-20">
      <Container size="xl">
        <div className="flex flex-col items-center text-center gap-3">
          <Badge
            color="yellow"
            variant="light"
            size="lg"
            radius="xl"
            leftSection={<IconStack2 size={14} />}
            styles={{ root: { textTransform: 'none' } }}
          >
            {t('feature-cards.badge')}
          </Badge>

          <Title
            order={2}
            c="bright"
            className="text-4xl! max-md:text-3xl!"
            style={{
              letterSpacing: -0.5
            }}
          >
            {t('feature-cards.title')}
          </Title>

          <Text
            c="dimmed"
            size="lg"
            className="max-w-[600px]"
          >
            {t('feature-cards.description')}
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 sm:w-3/5 md:w-full mx-auto">
          {cardConfigs.map(card => (
            <Card
              key={card.key}
              withBorder
              radius="lg"
              shadow="sm"
              p={0}
              padding={0}
            >
              <Card.Section>
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={t(`feature-cards.cards.${card.key}.title`)}
                    className="object-cover"
                    style={{
                      height: 220,
                      width: '100%'
                    }}
                  />
                ) : (
                  <div
                    className={card.placeholderClass}
                    style={{ height: 220 }}
                  />
                )}
              </Card.Section>

              <div className="flex flex-col gap-3 p-6">
                <Badge
                  color={card.badgeColor}
                  variant="light"
                  radius="xl"
                  className="self-start"
                  styles={{ root: { textTransform: 'none' } }}
                >
                  {t(`feature-cards.cards.${card.key}.badgeText`)}
                </Badge>

                <Title
                  order={3}
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: -0.3
                  }}
                >
                  {t(`feature-cards.cards.${card.key}.title`)}
                </Title>

                <Text
                  c="secondary"
                  size="sm"
                  style={{ lineHeight: 1.5 }}
                >
                  {t(`feature-cards.cards.${card.key}.description`)}
                </Text>

                <Text
                  component={Link}
                  href={card.href}
                  size="sm"
                  fw={600}
                  className="flex items-center gap-1.5 no-underline"
                  c="yellow.6"
                >
                  {t(`feature-cards.cards.${card.key}.linkText`)}
                  <IconArrowRight size={16} />
                </Text>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
