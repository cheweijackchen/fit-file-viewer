'use client'

import { ActionIcon, Group, Stack, Text } from '@mantine/core'
import { IconDotsVertical } from '@tabler/icons-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import mountainImage from '@/assets/mono-alphine-simplified-v2.webp'
import { HIKING_TRAIL_MAP } from '@/constants/hikingTrails'
import type { HikingPlan } from '@/model/hikingTrail'

dayjs.extend(relativeTime)

interface Props {
  plan: HikingPlan;
  onClick?: () => void;
}

export function TripCard({ plan, onClick }: Props) {
  const trailName = plan.trailIds[0] ? (HIKING_TRAIL_MAP[plan.trailIds[0]]?.name ?? plan.trailIds[0]) : '—'
  const lastEdited = dayjs(plan.updatedAt).fromNow()

  return (
    <div
      className="flex flex-col rounded-[14px] overflow-hidden cursor-pointer"
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--mantine-color-stone-3)',
        width: '100%',
      }}
      onClick={onClick}
    >
      <div style={{
        height: 140,
        position: 'relative',
        flexShrink: 0 
      }}
      >
        <Image
          fill
          src={mountainImage}
          alt={plan.name}
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      <Stack
        gap={10}
        p={16}
      >
        <Group
          justify="space-between"
          align="center"
        >
          <Text
            fw={700}
            size="sm"
            style={{
              fontSize: 15,
              color: 'var(--mantine-color-stone-9)' 
            }}
          >
            {plan.name}
          </Text>
          <ActionIcon
            size={32}
            radius="xl"
            style={{
              background: 'var(--mantine-color-stone-1)',
              color: 'var(--mantine-color-stone-7)' 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <IconDotsVertical size={16} />
          </ActionIcon>
        </Group>

        <Group
          gap={12}
          align="center"
        >
          <Text
            size="xs"
            style={{ color: 'var(--mantine-color-stone-6)' }}
          >
            {trailName}
          </Text>
          <Text
            size="xs"
            style={{ color: 'var(--mantine-color-stone-3)' }}
          >·</Text>
          <Text
            size="xs"
            style={{ color: 'var(--mantine-color-stone-6)' }}
          >
            {plan.days.length} 天
          </Text>
          <Text
            size="xs"
            style={{ color: 'var(--mantine-color-stone-3)' }}
          >·</Text>
          <Text
            size="xs"
            style={{ color: 'var(--mantine-color-stone-5)' }}
          >
            {lastEdited}
          </Text>
        </Group>
      </Stack>
    </div>
  )
}
