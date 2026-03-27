'use client'

import { Badge, Card, Container, Text, Title } from '@mantine/core'
import { IconArrowRight, IconStack2 } from '@tabler/icons-react'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import watchImage from '@/assets/photos/garmin-955.webp'
import mountRainierImage from '@/assets/photos/mount-rainer-wilderness.webp'
import mountainPeaksImage from '@/assets/photos/mountain-and-lake.webp'
import classes from './LandingFeatureCards.module.scss'

interface FeatureCard {
  image: StaticImageData | null;
  placeholderClass?: string;
  badgeText: string;
  badgeColor: string;
  title: string;
  description: string;
  linkText: string;
  href: string;
}

const cards: FeatureCard[] = [
  {
    image: mountainPeaksImage,
    placeholderClass: classes.placeholderImage,
    badgeText: 'Popular',
    badgeColor: 'yellow',
    title: 'Peaks Tracker',
    description: 'Log and visualize every summit you\'ve visited. Check the peaks on an interactive map and share the result with your friends.',
    linkText: 'Open Peaks Tracker',
    href: '/peaks',
  },
  {
    image: watchImage,
    badgeText: 'Essential',
    badgeColor: 'orange',
    title: 'FIT File Viewer',
    description: 'Upload your sports watch FIT files and instantly see heart rate zones, elevation profiles, GPS tracks, and detailed activity summaries.',
    linkText: 'Open FIT Viewer',
    href: '/fit-file-viewer',
  },
  {
    image: mountRainierImage,
    badgeText: 'Map',
    badgeColor: 'cyan',
    title: '3D Trail Map',
    description: 'Visualize your hiking routes on an interactive 3D map with terrain, satellite imagery, contour lines, and animated track playback.',
    linkText: 'Open Trail Map',
    href: '/trail-map',
  },
]

export function LandingFeatureCards() {
  return (
    <section className={`${classes.section} py-20`}>
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
            CORE TOOLS
          </Badge>

          <Title
            order={2}
            style={{
              fontSize: 42,
              fontWeight: 700,
              letterSpacing: -0.5
            }}
          >
            Everything You Need on the Trail
          </Title>

          <Text
            c="dimmed"
            size="lg"
            className="max-w-[600px]"
          >
            Powerful browser-based tools designed for hikers, by hikers. No account needed.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {cards.map(card => (
            <Card
              key={card.title}
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
                    alt={card.title}
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
                  {card.badgeText}
                </Badge>

                <Title
                  order={3}
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: -0.3
                  }}
                >
                  {card.title}
                </Title>

                <Text
                  c="secondary"
                  size="sm"
                  style={{ lineHeight: 1.5 }}
                >
                  {card.description}
                </Text>

                <Text
                  component={Link}
                  href={card.href}
                  size="sm"
                  fw={600}
                  className="flex items-center gap-1.5 no-underline"
                  c="yellow.6"
                >
                  {card.linkText}
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
