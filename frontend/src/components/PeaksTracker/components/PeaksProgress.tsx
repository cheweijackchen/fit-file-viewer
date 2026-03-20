'use client'

import { Progress } from '@mantine/core'

interface Props {
  completedCount: number;
  total: number;
}

export function PeaksProgress({ completedCount, total }: Props) {
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0

  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-end justify-between w-full">
        <div className="flex items-end gap-1">
          <span
            className="text-sm"
            style={{ color: '#8C8C8C' }}
          >
            已完成
          </span>
          <span
            className="text-[32px] font-semibold leading-none"
            style={{
              letterSpacing: -1,
              color: '#1A1A1A'
            }}
          >
            {completedCount}
          </span>
          <span
            className="text-sm"
            style={{ color: '#8C8C8C' }}
          >
            / {total} 座
          </span>
        </div>
        <span
          className="text-sm font-medium"
          style={{ color: '#8C8C8C' }}
        >
          {percentage}%
        </span>
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
