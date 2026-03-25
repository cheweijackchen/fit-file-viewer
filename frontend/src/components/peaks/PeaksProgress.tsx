'use client'

import { Progress, Text } from '@mantine/core'
import useScreen from '@/hooks/useScreen'

interface Props {
  completedCount: number;
  total: number;
}

export function PeaksProgress({ completedCount, total }: Props) {
  const { onMobile } = useScreen()
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0

  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-end justify-between w-full">
        <div className="flex items-end gap-1">
          <Text
            component="span"
            size="sm"
            c="dimmed"
          >
            已完成
          </Text>
          <Text
            c="bright"
            component="span"
            fz={onMobile ? 'md' : 32}
            fw={600}
            lh={onMobile ? undefined : 1}
          >
            {completedCount}
          </Text>
          <Text
            component="span"
            size="sm"
            c="dimmed"
          >
            / {total} 座
          </Text>
        </div>
        <Text
          component="span"
          size="sm"
          fw={500}
          c="dimmed"
        >
          {percentage}%
        </Text>
      </div>
      <Progress
        value={percentage}
        color="#F0C142"
        size={6}
        radius={3}
        styles={{
          root: { backgroundColor: '#F0EFED' },
        }}
      />
    </div>
  )
}
