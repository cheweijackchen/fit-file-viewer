'use client'

import { Alert, Button, Paper, Text, Title } from '@mantine/core'
import { IconAlertTriangle, IconMapPin, IconX } from '@tabler/icons-react'

import { GpxFileUploader } from '@/components/GpxFileUploader'
import { type useGpxParser } from '@/hooks/useGpxParser'
import { formatDuration } from '@/lib/elevationUtils'
import type { ParsedTrack } from '@/model/gpx'

import { StatBadge } from './StatBadge'

interface Props {
  track: ParsedTrack | null;
  parseState: ReturnType<typeof useGpxParser>['state'];
  onFile: (file: File) => void;
  onReset: () => void;
}

export function Sidebar({ track, parseState, onFile, onReset }: Props) {
  const isParsing = parseState.status === 'parsing'

  return (
    <aside className="w-70 flex flex-col mr-4 overflow-hidden shrink-0">
      {/* Header */}
      <div className="">
        <Title
          size="h3"
          order={3}
          fw={700}
          className="tracking-wider"
        >
          GPX 3D 軌跡地圖
        </Title>
        <Text
          size="xs"
          c="dimmed"
          mt="2xs"
        >
          上傳 .gpx 檔案以顯示軌跡
        </Text>
      </div>

      {/* Uploader */}
      <div className="py-4">
        <GpxFileUploader
          isParsing={isParsing}
          onFile={onFile}
        />
        {parseState.status === 'error' && (
          <Alert
            mt="xs"
            color="red"
            icon={<IconAlertTriangle size={16} />}
          >
            {parseState.message}
          </Alert>
        )}
      </div>

      {/* Track stats */}
      {track && (
        <div className="pb-4 flex flex-col gap-4 overflow-auto flex-1">
          {/* Track name */}
          <Paper
            p="xs"
            bg="blue.0"
            bd="1px solid blue.3"
          >
            <div className="flex items-start gap-1.5">
              <IconMapPin
                size={14}
                color="var(--mantine-color-blue-6)"
                className="mt-0.5"
              />
              <Text
                size="sm"
                fw={600}
                c="blue.6"
                className="flex-1 break-all"
              >
                {track.name}
              </Text>
            </div>
          </Paper>

          {/* Stats grid */}
          <Paper
            withBorder
            p="sm"
          >
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <StatBadge
                label="總距離"
                value={`${track.stats.distance} km`}
              />
              <StatBadge
                label="軌跡點"
                value={`${track.stats.totalPoints.toLocaleString()}`}
              />
              <StatBadge
                label="最高海拔"
                value={`${track.stats.maxElevation} m`}
              />
              <StatBadge
                label="最低海拔"
                value={`${track.stats.minElevation} m`}
              />
              <StatBadge
                label="累積爬升"
                value={`↑ ${track.stats.elevationGain} m`}
              />
              <StatBadge
                label="累積下降"
                value={`↓ ${track.stats.elevationLoss} m`}
              />
              {track.stats.duration !== null && (
                <StatBadge
                  label="總時間"
                  value={formatDuration(track.stats.duration)}
                />
              )}
            </div>
          </Paper>

          {/* Reset button */}
          <Button
            fullWidth
            variant="outline"
            color="red"
            size="xs"
            leftSection={<IconX size={12} />}
            onClick={onReset}
          >
            清除軌跡
          </Button>
        </div>
      )}
    </aside>
  )
}
