'use client'

import { Badge, Container, Title } from '@mantine/core'
import { IconShieldCheck } from '@tabler/icons-react'
import clsx from 'clsx'

interface StatCard {
  value: string;
  valueClass: string;
  label: string;
}

const stats: StatCard[] = [
  {
    value: '100%',
    valueClass: 'text-(--mantine-color-yellow-4)',
    label: 'Client-Side Processing',
  },
  {
    value: '0 Bytes',
    valueClass: 'text-(--mantine-color-orange-4)',
    label: 'Uploaded to Servers',
  },
  {
    value: 'No Account',
    valueClass: 'text-(--mantine-color-cyan-2)',
    label: 'Required to Get Started',
  },
  {
    value: 'Open Source',
    valueClass: 'text-(--mantine-color-green-1)',
    label: 'Free Forever',
  },
]

export function LandingPrivacy() {
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
            WHY TRAILKIT
          </Badge>

          <Title
            order={2}
            className="text-4xl! max-md:text-3xl! max-w-200 text-center text-(--mantine-color-white)"
            style={{ letterSpacing: -0.5 }}
          >
            Built for Hikers Who Care About Privacy
          </Title>

          <p className="text-lg text-(--mantine-color-dark-2)">
            Your GPS data, heart rate, and trail logs never leave your browser. Period.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {stats.map(stat => (
            <div
              key={stat.value}
              className="flex flex-col items-center gap-2 p-6 bg-white/4 border border-white/7 rounded-(--mantine-radius-lg)"
            >
              <span
                className={clsx('text-3xl font-bold', stat.valueClass)}
                style={{ letterSpacing: -1 }}
              >
                {stat.value}
              </span>

              <span className="text-sm font-medium text-center text-(--mantine-color-dark-2)">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
