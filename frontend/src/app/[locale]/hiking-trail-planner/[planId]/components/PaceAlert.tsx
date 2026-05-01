'use client'

import { Alert, Text } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

interface Props {
  paceMultiplier: number;
}

const SLOW_THRESHOLD = 1.2
const FAST_THRESHOLD = 0.7

export function PaceAlert({ paceMultiplier }: Props) {
  const t = useTranslations('hiking-trail-planner')

  if (paceMultiplier >= SLOW_THRESHOLD) {
    return (
      <Alert
        color="red"
        radius="lg"
        icon={<IconAlertTriangle size={16} />}
        title={t('planDetail.pace.alert.slow.title')}
      >
        <Text
          size="xs"
          className="whitespace-pre-line"
        >
          {t('planDetail.pace.alert.slow.body')}
        </Text>
      </Alert>
    )
  }

  if (paceMultiplier <= FAST_THRESHOLD) {
    return (
      <Alert
        color="red"
        radius="lg"
        icon={<IconAlertTriangle size={16} />}
        title={t('planDetail.pace.alert.fast.title')}
      >
        <Text
          size="xs"
          className="whitespace-pre-line"
        >
          {t('planDetail.pace.alert.fast.body')}
        </Text>
      </Alert>
    )
  }

  return null
}
