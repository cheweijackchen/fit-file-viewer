'use client'

import { Box, Button, Group, Stack, Text, Title } from '@mantine/core'
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
        className="flex flex-col items-center w-full bg-(--mantine-color-stone-1) py-20 px-10 gap-6"
      >
        <Title
          order={1}
          ta="center"
          c="stone.9"
          className="text-[40px] max-w-[700px]"
        >
          {t('hero.title')}
        </Title>

        <Text
          ta="center"
          size="md"
          c="stone.7"
          className="leading-[1.6] max-w-[560px]"
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
              className="w-[180px]"
            >
              <Box
                w={44}
                h={44}
                bg="stone.2"
                c="stone.7"
                className="flex items-center justify-center rounded-[10px]"
              >
                {f.icon}
              </Box>
              <Text
                fw={600}
                ta="center"
                c="stone.9"
                className="text-[13px]"
              >
                {t(f.titleKey)}
              </Text>
              <Text
                ta="center"
                size="xs"
                c="stone.6"
                className="leading-normal"
              >
                {t(f.descriptionKey)}
              </Text>
            </Stack>
          ))}
        </Group>
      </section>

      {/* Your Trips */}
      <section
        className="flex flex-col w-full bg-(--mantine-color-stone-2) py-12 px-20 gap-6"
      >
        <Group
          justify="space-between"
          align="center"
        >
          <Text
            fw={700}
            size="xl"
            c="stone.9"
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
            className="flex items-center justify-center w-full rounded-xl bg-(--mantine-color-stone-1) py-12 px-6 border-[1.5px] border-dashed border-(--mantine-color-stone-3)"
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
          <div className="grid grid-cols-3 gap-5 w-full">
            {plans.map((plan) => (
              <TripCard
                key={plan.id}
                plan={plan}
                onClick={() => router.push(`/hiking-trail-planner/${plan.id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
