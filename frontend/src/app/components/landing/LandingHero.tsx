'use client'

import { Badge, Button, Container, Text, Title } from '@mantine/core'
import { IconArrowRight, IconCompass } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import heroImage from '@/assets/hero.webp'

export function LandingHero() {
  return (
    <section className="relative h-[620px] overflow-hidden flex items-center justify-center max-md:h-[520px]">
      <Image
        fill
        priority
        src={heroImage}
        alt="Mountain hiking trail landscape"
        className="object-cover"
      />

      <div
        className="absolute inset-0"
      />

      <Container
        size="xl"
        className="relative z-10 flex flex-col items-center gap-7 text-center"
      >
        <Badge
          variant="light"
          size="lg"
          radius="xl"
          leftSection={<IconCompass size={16} />}
          styles={{
            root: { textTransform: 'none' },
          }}
        >
          Free & Privacy-First Hiking Tools
        </Badge>

        <Title
          order={1}
          className="max-w-[900px] max-md:text-[40px]"
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: 'white',
            letterSpacing: -1,
          }}
        >
          Your Complete Hiking Toolkit
        </Title>

        <Text
          size="xl"
          c="gray.2"
          className="max-w-[700px] max-md:text-base"
          style={{ lineHeight: 1.5 }}
        >
          Analyze your trails, track your peaks, and visualize every adventure — all in your browser, no data leaves your device.
        </Text>

        <div className="flex gap-4 max-sm:flex-col max-sm:w-full">
          <Button
            component={Link}
            href="/tools"
            color="yellow"
            size="lg"
            radius="xl"
            rightSection={<IconArrowRight size={18} />}
          >
            Explore Tools
          </Button>
          <Button
            component={Link}
            href="/demo"
            variant="default"
            size="lg"
            radius="xl"
            styles={{
              root: {
                'backgroundColor': 'transparent',
                'borderColor': 'white',
                'color': 'white',
              },
            }}
          >
            View Demo
          </Button>
        </div>
      </Container>
    </section>
  )
}
