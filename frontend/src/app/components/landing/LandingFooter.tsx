'use client'

import { Container, Text } from '@mantine/core'
import { IconMountain } from '@tabler/icons-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface NavColumn {
  key: string;
  links: { key: string; href: string; }[];
}

const navColumns: NavColumn[] = [
  {
    key: 'tools',
    links: [
      {
        key: 'peaksTracker',
        href: '/peaks' 
      },
      {
        key: 'fitFileViewer',
        href: '/fit-file-viewer' 
      },
      {
        key: 'gpxConverter',
        href: '#' 
      },
    ],
  },
  {
    key: 'resources',
    links: [
      {
        key: 'documentation',
        href: '#' 
      },
      {
        key: 'blog',
        href: '#' 
      },
      {
        key: 'changelog',
        href: '#' 
      },
      {
        key: 'github',
        href: 'https://github.com' 
      },
    ],
  },
  {
    key: 'community',
    links: [
      {
        key: 'discord',
        href: '#' 
      },
      {
        key: 'contribute',
        href: '#' 
      },
      {
        key: 'featureRequests',
        href: '#' 
      },
      {
        key: 'privacyPolicy',
        href: '#' 
      },
    ],
  },
]

export function LandingFooter() {
  const t = useTranslations('landing')

  return (
    <footer className="bg-(--mantine-color-dark-9)">
      <Container
        size="xl"
        className="py-12 pb-8"
      >
        <div className="flex justify-between gap-16 max-md:flex-col">
          <div className="flex flex-col gap-3 max-w-[300px]">
            <Link
              href="/"
              className="flex items-center gap-2.5 no-underline w-fit"
            >
              <IconMountain
                size={24}
                color="var(--mantine-color-yellow-5)"
              />
              <Text
                fw={700}
                size="lg"
                c="white"
              >
                {t('header.brand')}
              </Text>
            </Link>

            <Text
              c="white"
              size="xs"
              className="leading-relaxed max-w-[280px]"
            >
              {t('footer.tagline')}
            </Text>
          </div>

          <div className="flex gap-16 max-sm:flex-col max-sm:gap-8">
            {navColumns.map(col => (
              <div
                key={col.key}
                className="flex flex-col gap-3.5"
              >
                <Text
                  c="white"
                  size="xs"
                  fw={600}
                  className="tracking-wide"
                >
                  {t(`footer.nav.${col.key}.title`)}
                </Text>

                {col.links.map(link => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className="no-underline text-sm text-white"
                  >
                    {t(`footer.nav.${col.key}.links.${link.key}`)}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 h-px bg-white/7" />

        <Text
          size="xs"
          ta="center"
          c="white"
        >
          {t('footer.copyright')}
        </Text>
      </Container>
    </footer>
  )
}
