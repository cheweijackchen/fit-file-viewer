'use client'

import { Badge, Card, Container, Text, Title } from '@mantine/core'
import { IconMapPin, IconRepeat, IconSparkles, IconSunWind, IconTrendingUp } from '@tabler/icons-react'
import type { ComponentType, CSSProperties } from 'react'

interface ComingSoonCard {
  icon: ComponentType<{ size: number; style?: CSSProperties; }>;
  iconColor: string;
  iconBgClass: string;
  title: string;
  description: string;
}

const cards: ComingSoonCard[] = [
  {
    icon: IconMapPin,
    iconColor: 'var(--mantine-color-yellow-5)',
    iconBgClass: 'bg-(--mantine-color-yellow-1)/90',
    title: 'Trail Planner',
    description: 'Plan routes, estimate time, and share trails with friends before you go.',
  },
  {
    icon: IconTrendingUp,
    iconColor: 'var(--mantine-color-orange-4)',
    iconBgClass: 'bg-(--mantine-color-orange-1)/40',
    title: 'Elevation Analyzer',
    description: 'Detailed elevation gain/loss charts with gradient analysis for trail difficulty.',
  },
  {
    icon: IconSunWind,
    iconColor: 'var(--mantine-color-cyan-6)',
    iconBgClass: 'bg-(--mantine-color-cyan-1)/40',
    title: 'Weather Overlay',
    description: 'See historical weather conditions overlaid on your hike timeline and GPS track.',
  },
  {
    icon: IconRepeat,
    iconColor: 'var(--mantine-color-green-6)',
    iconBgClass: 'bg-(--mantine-color-green-2)/20',
    title: 'GPX Converter',
    description: 'Convert between FIT, GPX, and KML formats. Merge or split track files effortlessly.',
  },
]

export function LandingComingSoon() {
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
            COMING SOON
          </Badge>

          <Title
            order={2}
            c="bright"
            className="text-4xl! max-md:text-3xl!"
            style={{ letterSpacing: -0.5 }}
          >
            More Tools on the Way
          </Title>

          <Text
            c="dimmed"
            size="lg"
          >
            We&apos;re building more privacy-first tools to make every hike better.
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {cards.map(card => (
            <Card
              key={card.title}
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
                  {card.title}
                </Text>

                <Text
                  c="dimmed"
                  size="sm"
                  style={{ lineHeight: 1.5 }}
                >
                  {card.description}
                </Text>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
