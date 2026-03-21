'use client'

import { Badge, Divider, Modal, RingProgress, Text } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import { useMemo } from 'react'
import { Taiwan100MountainPeak, type MountainPeak } from '@/constants/peaks'

interface Props {
  opened: boolean;
  checkedIds: Set<string>;
  userName: string;
  onClose: () => void;
}

interface CategoryGroup {
  category: string;
  peaks: {
    id: string;
    peak: MountainPeak;
  }[];
}

function groupPeaksByCategory(): CategoryGroup[] {
  const map = new Map<string, {
    id: string;
    peak: MountainPeak;
  }[]>()

  for (const [id, peak] of Object.entries(Taiwan100MountainPeak)) {
    const list = map.get(peak.category) ?? []
    list.push({
      id,
      peak,
    })
    map.set(peak.category, list)
  }

  return Array.from(map.entries()).map(([category, peaks]) => ({
    category,
    peaks,
  }))
}

const categoryGroups = groupPeaksByCategory()

export function PeaksProgressDialog({ opened, checkedIds, userName, onClose }: Props) {
  const completedCount = useMemo(() => {
    return Object.keys(Taiwan100MountainPeak).filter(id => checkedIds.has(id)).length
  }, [checkedIds])

  const total = Object.keys(Taiwan100MountainPeak).length
  const percentage = Math.round((completedCount / total) * 100)

  return (
    <Modal
      centered
      withCloseButton
      opened={opened}
      size="xl"
      padding="lg"
      onClose={onClose}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <Text
            fw={700}
            size="xl"
          >
            台灣百岳登頂紀錄
          </Text>
          <Text
            c="dimmed"
            size="sm"
          >
            Taiwan 100 Peaks Progress Tracker
          </Text>
        </div>
        {userName && (
          <Badge
            size="xl"
            variant="gradient"
            gradient={{
              from: 'yellow',
              to: 'orange',
            }}
          >
            {userName}
          </Badge>
        )}
      </div>

      {/* Progress */}
      <div className="flex flex-col items-center mb-8">
        <RingProgress
          roundCaps
          label={
            <div className="flex flex-col items-center">
              <Text
                c="dimmed"
                size="xs"
              >
                目前進度
              </Text>
              <Text
                fw={700}
                size="xl"
              >
                {completedCount}/{total}
              </Text>
            </div>
          }
          sections={[{
            value: percentage,
            color: 'yellow',
          }]}
          size={160}
          thickness={14}
        />
      </div>

      {/* Peaks Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {categoryGroups.map(group => (
          <div
            key={group.category}
            className="break-inside-avoid mb-4"
          >
            <Text
              c="dark"
              fw={700}
              size="sm"
            >
              {group.category}
            </Text>
            <Divider className="my-1" />
            <div className="flex flex-col gap-1">
              {group.peaks.map(({ id, peak }) => {
                const checked = checkedIds.has(id)
                return (
                  <div
                    key={id}
                    className="flex items-center gap-1.5"
                  >
                    {checked
                      ? (
                        <IconCheck
                          className="text-yellow-500 shrink-0"
                          size={14}
                        />
                      )
                      : <div className="w-3.5 shrink-0" />}
                    <Text
                      c={checked ? undefined : 'dimmed'}
                      fw={checked ? 600 : 400}
                      size="xs"
                    >
                      {peak.name} {peak.elevation}m
                    </Text>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}
