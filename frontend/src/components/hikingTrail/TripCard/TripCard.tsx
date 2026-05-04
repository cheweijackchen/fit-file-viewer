'use client'

import { ActionIcon, Group, Menu, Stack, Text } from '@mantine/core'
import { Image as MantineImage } from '@mantine/core'
import { IconDotsVertical, IconEye, IconPencil, IconTrash } from '@tabler/icons-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import NextImage from 'next/image'
import mountainImage from '@/assets/mono-alpine-simplified-v2.webp'
import { HIKING_TRAIL_MAP } from '@/constants/hikingTrails'
import type { HikingPlan } from '@/model/hikingTrail'

dayjs.extend(relativeTime)

interface Props {
  plan: HikingPlan;
  onClick?: () => void;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TripCard({ plan, onClick, onView, onEdit, onDelete }: Props) {
  const trailName = plan.trailIds[0] ? (HIKING_TRAIL_MAP[plan.trailIds[0]]?.name ?? plan.trailIds[0]) : '—'
  const lastEdited = dayjs(plan.updatedAt).fromNow()

  return (
    <div
      className="flex flex-col rounded-[14px] overflow-hidden cursor-pointer bg-white border border-(--mantine-color-stone-3) w-full"
      onClick={onClick}
    >
      <div className="relative shrink-0 h-[140px]">
        {plan.coverPhoto
          ? (
        // MantineImage handles base64 data: URLs; Next/Image cannot optimize them
            <MantineImage
              src={plan.coverPhoto}
              alt={plan.name}
              h={140}
              w="100%"
              fit="cover"
            />
          )
          : (
        // NextImage for the static asset — enables optimization, lazy loading, WebP
            <NextImage
              fill
              src={mountainImage}
              alt={plan.name}
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 400px"
            />
          )}
      </div>

      <Stack
        gap={10}
        p={16}
      >
        <Group
          justify="space-between"
          align="center"
          wrap="nowrap"
        >
          <Text
            fw={700}
            size="sm"
            c="stone.9"
          >
            {plan.name}
          </Text>
          <Menu
            withinPortal
            position="bottom-end"
          >
            <Menu.Target>
              <ActionIcon
                size={32}
                radius="xl"
                color="stone.1"
                c="stone.6"
                className="shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <IconDotsVertical size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                c="bright"
                color="stone"
                leftSection={<IconEye size={14} />}
                onClick={(e) => {
                  e.stopPropagation()
                  onView?.()
                }}
              >
                檢視
              </Menu.Item>
              <Menu.Item
                c="bright"
                color="stone"
                leftSection={<IconPencil size={14} />}
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit?.()
                }}
              >
                編輯
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete?.()
                }}
              >
                刪除
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Group
          gap={12}
          align="center"
        >
          <Text
            size="xs"
            c="stone.6"
          >
            {trailName}
          </Text>
          <Text
            size="xs"
            c="stone.3"
          >·</Text>
          <Text
            size="xs"
            c="stone.6"
          >
            {plan.days.length} 天
          </Text>
          <Text
            size="xs"
            c="stone.3"
          >·</Text>
          <Text
            size="xs"
            c="stone.5"
          >
            {lastEdited}
          </Text>
        </Group>
      </Stack>
    </div>
  )
}
