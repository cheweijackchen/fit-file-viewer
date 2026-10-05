'use client'

import { Stack, Text } from '@mantine/core'
import { Dropzone, type FileWithPath } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { IconBike, IconUpload, IconX } from '@tabler/icons-react'
import FitParser from 'fit-file-parser'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FIT_PARSER_LENGTH_UNIT, FIT_PARSER_SPEED_UNIT } from '@/constants/fitData'
import { type ParsedFit } from '@/model/fitParser'
import { useFitDataActions } from '@/store/app/useFitDataStore'

interface Props {
  className?: string;
  onSuccess?: () => void;
}

const MAX_FILE_SIZE_IN_BYTES = 5 * (1024 ** 2)

export function FitFileUploader({ className, onSuccess }: Props) {
  const [parseLoading, setParseLoading] = useState(false)
  const { setFileName, setFitData } = useFitDataActions()
  const t = useTranslations('fit-file-viewer')

  function onFileDrop(files: FileWithPath[]) {
    handleFitFile(files[0])
  }

  function showParsingErrorNotification(error: unknown) {
    notifications.show({
      title: t('upload.parsingError'),
      message: JSON.stringify(error),
      color: 'red'
    })
  }

  async function handleFitFile(file: File) {
    //TODO: validation

    try {
      setParseLoading(true)
      const buffer = await file.arrayBuffer()
      const fitParser = new FitParser({
        force: true,
        mode: 'list',
        speedUnit: FIT_PARSER_SPEED_UNIT,
        lengthUnit: FIT_PARSER_LENGTH_UNIT
      })

      await fitParser.parseAsync(buffer)
        .then((data) => {
          console.log(data)
          setFitData(data as ParsedFit)
          setFileName(file.name)
          onSuccess?.()
        })
        .catch((error) => {
          showParsingErrorNotification(error)
        })
    } catch (error) {
      showParsingErrorNotification(error)
    } finally {
      setParseLoading(false)
    }
  }

  return (
    <Dropzone
      bg="yellow.4"
      bd="3px dashed yellow.2"
      className={className}
      maxSize={MAX_FILE_SIZE_IN_BYTES}
      loading={parseLoading}
      onDrop={onFileDrop}
      onReject={(files) => console.log('rejected files', files)}
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
            <IconBike
              size={52}
              color="white"
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
            {t('upload.instruction')}
          </Text>
          <Text
            size="sm"
            c="dimmed"
            mt="xs"
            ff="mono"
            className="max-w-120"
          >
            {t('upload.hint')}
          </Text>
        </Stack>
      </Stack>
    </Dropzone >
  )
}
