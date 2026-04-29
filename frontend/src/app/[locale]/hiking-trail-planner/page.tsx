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
import { useRouter } from '@/i18n/navigation'
import { useHikingTrailActions, useHikingTrailStore } from '@/store/hikingTrail/useHikingTrailStore'

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
  const router = useRouter()
  const plans = useHikingTrailStore.use.plans()
  const { createPlan } = useHikingTrailActions()

  function handleNewTrip() {
    const id = createPlan('新行程', [])
    router.push(`/hiking-trail-planner/${id}?edit=true`)
  }

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
            onClick={handleNewTrip}
          >
            {t('yourTrips.newTrip')}
          </Button>
        </Group>

        {plans.length === 0 ? (
          <div
            className="flex items-center justify-center w-full rounded-xl"
            style={{
              padding: '48px 24px',
              background: 'var(--mantine-color-stone-1)',
              border: '1.5px dashed var(--mantine-color-stone-3)',
            }}
          >
            <Text
              size="sm"
              c="stone.4"
              ta="center"
            >
              {t('yourTrips.empty')}
            </Text>
          </div>
        ) : (
          <Group
            gap={20}
            align="stretch"
            style={{ width: '100%' }}
          >
            {plans.map((plan) => (
              <Box
                key={plan.id}
                style={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <TripCard
                  plan={plan}
                  onClick={() => router.push(`/hiking-trail-planner/${plan.id}`)}
                />
              </Box>
            ))}
          </Group>
        )}
      </section>
    </div>
  )
}
