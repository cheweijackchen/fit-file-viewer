'use client'

import { Badge, Button, Container, Text, Title } from '@mantine/core'
import { IconArrowRight, IconCompass } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import heroImage from '@/assets/hero.webp'

export function LandingHero() {
  const t = useTranslations('landing')

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
          {t('hero.badge')}
        </Badge>

        <Title
          order={2}
          c="white"
          className="max-w-[900px] max-md:text-[40px]! text-[64px]!"
          style={{
            letterSpacing: -1,
          }}
        >
          {t('hero.title')}
        </Title>

        <Text
          c="gray.2"
          className="max-w-[700px] text-lg! md:text-xl!"
          style={{ lineHeight: 1.5 }}
        >
          {t('hero.description')}
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
            {t('hero.ctaPrimary')}
          </Button>
          {/* <Button
            component={Link}
            href="/"
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
            {t('hero.ctaSecondary')}
          </Button> */}
        </div>
      </Container>
    </section>
  )
}
