'use client'

import { Container, Text, Title } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { useCallback } from 'react'
import { useRouter } from '@/i18n/navigation'
import { useHikingTrailActions } from '@/store/hikingTrail/useHikingTrailStore'
import { tripExamples, type PlanTemplate } from './examples'
import { PlanTemplateCard } from './PlanTemplateCard'

export function StartFromPlanSection() {
  const t = useTranslations('hiking-trail-planner.startFromPlan')
  const router = useRouter()
  const { createPlan, updatePlan } = useHikingTrailActions()

  const handleUsePlan = useCallback((example: PlanTemplate) => {
    const id = createPlan(example.name, example.trailIds)
    const now = Date.now()
    updatePlan(id, {
      id,
      name: example.name,
      trailIds: example.trailIds,
      paceMultiplier: example.paceMultiplier,
      days: example.days,
      createdAt: now,
      updatedAt: now,
    })
    router.push(`/hiking-trail-planner/${id}`)
  }, [createPlan, updatePlan, router])

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
        <div className="flex flex-col items-center gap-2">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {tripExamples.map((example) => (
            <PlanTemplateCard
              key={example.name}
              name={example.name}
              trailName={t(`trailNames.${example.trailIds[0]}`)}
              days={example.days.length}
              onUse={() => handleUsePlan(example)}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
