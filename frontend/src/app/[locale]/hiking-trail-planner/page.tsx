'use client'

import { Box, Button, Group, Stack, Text } from '@mantine/core'
import {
  IconCalendar,
  IconGitFork,
  IconMap,
  IconPlus,
  IconRoute,
} from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { TripCard } from '@/components/hikingTrail/TripCard'
import type { HikingPlan } from '@/model/hikingTrail'

const MOCK_PLANS: HikingPlan[] = [
  {
    id: '1',
    name: '南二段規劃',
    trailIds: ['south-second-section'],
    paceMultiplier: 1.0,
    days: [{
      id: 'd1',
      badges: [],
      stops: [] 
    }, {
      id: 'd2',
      badges: [],
      stops: [] 
    }, {
      id: 'd3',
      badges: [],
      stops: [] 
    }],
    createdAt: Date.now() - (7 * 24 * 60 * 60 * 1000),
    updatedAt: Date.now() - (2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    name: '北一段縱走',
    trailIds: ['north-first-section'],
    paceMultiplier: 1.1,
    days: [{
      id: 'd1',
      badges: [],
      stops: []
    }, {
      id: 'd2',
      badges: [],
      stops: []
    }, {
      id: 'd3',
      badges: [],
      stops: []
    }, {
      id: 'd4',
      badges: [],
      stops: []
    }],
    createdAt: Date.now() - (14 * 24 * 60 * 60 * 1000),
    updatedAt: Date.now() - (5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    name: '玉山群峰探索',
    trailIds: ['yushan-group'],
    paceMultiplier: 0.9,
    days: [{
      id: 'd1',
      badges: [],
      stops: []
    }, {
      id: 'd2',
      badges: [],
      stops: []
    }],
    createdAt: Date.now() - (3 * 24 * 60 * 60 * 1000),
    updatedAt: Date.now() - (60 * 60 * 1000),
  },
]

interface FeatureItem {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: <IconGitFork size={20} />,
    titleKey: 'features.visualTrailGraph.title',
    descriptionKey: 'features.visualTrailGraph.description',
  },
  {
    icon: <IconCalendar size={20} />,
    titleKey: 'features.multiDayPlanning.title',
    descriptionKey: 'features.multiDayPlanning.description',
  },
  {
    icon: <IconRoute size={20} />,
    titleKey: 'features.connectedRoutes.title',
    descriptionKey: 'features.connectedRoutes.description',
  },
]

export default function HikingTrailPlannerPage() {
  const t = useTranslations('hiking-trail-planner')

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section
        className="flex flex-col items-center w-full"
        style={{
          background: 'var(--mantine-color-stone-1)',
          padding: '80px 40px',
          gap: 24,
        }}
      >
        <Text
          fw={700}
          ta="center"
          style={{
            fontSize: 40,
            color: 'var(--mantine-color-stone-9)',
            maxWidth: 700 
          }}
        >
          {t('hero.title')}
        </Text>

        <Text
          ta="center"
          style={{
            fontSize: 16,
            color: 'var(--mantine-color-stone-7)',
            lineHeight: 1.6,
            maxWidth: 560,
          }}
        >
          {t('hero.description')}
        </Text>

        <Button
          color="yellow"
          leftSection={<IconMap size={18} />}
          radius={10}
          fw={600}
        >
          {t('hero.cta')}
        </Button>

        <Group
          gap={32}
          align="flex-start"
          mt={8}
        >
          {FEATURES.map((f) => (
            <Stack
              key={f.titleKey}
              gap={8}
              align="center"
              style={{ width: 180 }}
            >
              <Box
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: 'var(--mantine-color-stone-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--mantine-color-stone-7)',
                }}
              >
                {f.icon}
              </Box>
              <Text
                fw={600}
                ta="center"
                style={{
                  fontSize: 13,
                  color: 'var(--mantine-color-stone-9)'
                }}
              >
                {t(f.titleKey)}
              </Text>
              <Text
                ta="center"
                style={{
                  fontSize: 12,
                  color: 'var(--mantine-color-stone-6)',
                  lineHeight: 1.5
                }}
              >
                {t(f.descriptionKey)}
              </Text>
            </Stack>
          ))}
        </Group>
      </section>

      {/* Your Trips */}
      <section
        className="flex flex-col w-full"
        style={{
          background: 'var(--mantine-color-stone-2)',
          padding: '48px 80px',
          gap: 24,
        }}
      >
        <Group
          justify="space-between"
          align="center"
        >
          <Text
            fw={700}
            style={{
              fontSize: 20,
              color: 'var(--mantine-color-stone-9)'
            }}
          >
            {t('yourTrips.heading')}
          </Text>
          <Button
            color="yellow"
            size="sm"
            radius={8}
            leftSection={<IconPlus size={14} />}
            fw={600}
          >
            {t('yourTrips.newTrip')}
          </Button>
        </Group>

        <Group
          gap={20}
          align="stretch"
          style={{ width: '100%' }}
        >
          {MOCK_PLANS.map((plan) => (
            <Box
              key={plan.id}
              style={{
                flex: 1,
                minWidth: 0 
              }}
            >
              <TripCard plan={plan} />
            </Box>
          ))}
        </Group>
      </section>
    </div>
  )
}
