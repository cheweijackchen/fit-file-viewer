'use client'

import { Container, Text, Title } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { PlanTemplateCard } from './PlanTemplateCard'

const PLAN_TEMPLATES = [
  {
    id: 'jade',
    nameKey: 'plans.jadeMountain.name',
    trailNameKey: 'plans.jadeMountain.trailName',
    days: 3,
  },
  {
    id: 'hehuan',
    nameKey: 'plans.hehuanTraverse.name',
    trailNameKey: 'plans.hehuanTraverse.trailName',
    days: 2,
  },
  {
    id: 'snow',
    nameKey: 'plans.snowMountain.name',
    trailNameKey: 'plans.snowMountain.trailName',
    days: 4,
  },
]

export function StartFromPlanSection() {
  const t = useTranslations('hiking-trail-planner.startFromPlan')

  return (
    <section className="w-full bg-(--mantine-color-stone-9)">
      <Container
        size="xl"
        py={72}
        px={{
          base: 'md',
          md: 80,
        }}
        className="flex flex-col gap-12"
      >
        <div className="flex flex-col  items-center gap-2">
          <Text
            fw={700}
            c="yellow.5"
            className="text-[11px] tracking-[2px]"
          >
            {t('eyebrow')}
          </Text>
          <Title
            order={2}
            fw={700}
            c="stone.0"
            className="text-[34px]"
          >
            {t('title')}
          </Title>
          <Text
            size="md"
            c="stone.6"
          >
            {t('subtitle')}
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {PLAN_TEMPLATES.map((plan) => (
            <PlanTemplateCard
              key={plan.id}
              name={t(plan.nameKey)}
              trailName={t(plan.trailNameKey)}
              days={plan.days}
              onUse={() => {}}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
