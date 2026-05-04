'use client'

import { Stack, Text } from '@mantine/core'
import { Dropzone, type FileWithPath } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { IconMap, IconUpload, IconX } from '@tabler/icons-react'
import { useEffect } from 'react'
import { GPX_PARSE_STATUS, useGpxParser } from '@/hooks/useGpxParser'
import { useMapActions } from '@/store/map/useMapStore'

interface Props {
  className?: string;
  onSuccess?: () => void;
}

export function GpxUploader({ className, onSuccess }: Props) {
  const { state, parseFile } = useGpxParser()
  const { setTrack } = useMapActions()

  useEffect(() => {
    if (state.status === GPX_PARSE_STATUS.SUCCESS) {
      setTrack(state.track)
      onSuccess?.()
    }
    if (state.status === GPX_PARSE_STATUS.ERROR) {
      notifications.show({
        title: 'Parse Error',
        message: state.message,
        color: 'red',
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status])

  function onFileDrop(files: FileWithPath[]) {
    parseFile(files[0])
  }

  return (
    <Dropzone
      bg="yellow.4"
      bd="3px dashed yellow.2"
      className={className}
      accept={['.gpx']}
      loading={state.status === GPX_PARSE_STATUS.PARSING}
      onDrop={onFileDrop}
      onReject={() => {
        notifications.show({
          title: 'Invalid file',
          message: 'Please upload a .gpx file.',
          color: 'red',
        })
      }}
    >
      <Stack
        align="center"
        gap="xl"
        py="3xl"
        style={{ pointerEvents: 'none' }}
      >
        <div>
          <Dropzone.Accept>
            <IconUpload
              size={52}
              color="var(--mantine-color-yellow-8)"
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size={52}
              color="var(--mantine-color-red-6)"
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconMap
              size={52}
              color="var(--mantine-color-yellow-8)"
              stroke={1.5}
            />
          </Dropzone.Idle>
        </div>

        <Stack
          align="center"
          gap={0}
        >
          <Text
            size="xl"
            c="white"
            fw="600"
            ff="mono"
          >
            Upload your .gpx file
          </Text>
          <Text
            size="sm"
            c="dimmed"
            mt="xs"
            ff="mono"
            className="max-w-120"
          >
            Drag file here or click to select, each file should not exceed 5mb.
          </Text>
        </Stack>
      </Stack>
    </Dropzone>
  )
}
