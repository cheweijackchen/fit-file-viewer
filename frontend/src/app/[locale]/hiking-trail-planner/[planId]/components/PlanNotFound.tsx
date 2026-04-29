'use client'

import { Text } from '@mantine/core'
import { Link } from '@/i18n/navigation'

export function PlanNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-32">
      <Text
        c="stone.5"
        size="lg"
      >
        計畫不存在
      </Text>
      <Link href="/hiking-trail-planner">
        <Text
          size="sm"
          c="stone.4"
          td="underline"
        >
          返回行程列表
        </Text>
      </Link>
    </div>
  )
}
