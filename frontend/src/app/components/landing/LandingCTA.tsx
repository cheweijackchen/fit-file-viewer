'use client'

import { Button, Container, Text, Title } from '@mantine/core'
import { IconArrowRight } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import nanhuCirque from '@/assets/nanhu-cirque.webp'

export function LandingCTA() {
  const t = useTranslations('landing')

  return (
    <section className="relative h-[400px] overflow-hidden flex items-center justify-center">
      <Image
        fill
        src={nanhuCirque}
        alt="Nanhu Cirque mountain landscape"
        className="object-cover"
      />

      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, color-mix(in srgb, var(--mantine-color-yellow-5) 75%, transparent) 0%, color-mix(in srgb, var(--mantine-color-dark-9) 60%, transparent) 100%)',
        }}
      />

      <Container
        size="xl"
        className="relative z-10 flex flex-col items-center text-center gap-6"
      >
        <Title
          order={2}
          c="white"
          className="text-[48px]! max-md:text-4xl!"
          style={{ letterSpacing: -0.5 }}
        >
          {t('cta.title')}
        </Title>

        <Text
          c="gray.2"
          className="max-w-[600px] text-lg!"
          style={{ lineHeight: 1.6 }}
        >
          {t('cta.description')}
        </Text>

        <div className="flex gap-4 max-sm:flex-col max-sm:w-full">
          <Button
            component={Link}
            href="/hiking-trail-planner"
            variant="white"
            size="lg"
            radius="xl"
            rightSection={<IconArrowRight size={18} />}
          >
            {t('cta.ctaPrimary')}
          </Button>

          <Button
            component={Link}
            href="/hiking-trail-planner#example-trails"
            variant="outline"
            size="lg"
            radius="xl"
            styles={{
              root: {
                borderColor: 'white',
                color: 'white',
              },
            }}
          >
            {t('cta.ctaSecondary')}
          </Button>
        </div>
      </Container>
    </section>
  )
}
