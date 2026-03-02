import { Stack, Text } from '@mantine/core'
import { Dropzone, type FileWithPath } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { IconMap, IconUpload, IconX } from '@tabler/icons-react'

interface Props {
  className?: string;
  onFile: (file: File) => void;
  isParsing: boolean;
}

export function GpxFileUploader({ className, onFile, isParsing }: Props) {
  function onDrop(files: FileWithPath[]) {
    onFile(files[0])
  }

  function onReject() {
    notifications.show({
      title: '不支援的檔案格式',
      message: '請上傳 .gpx 格式的檔案',
      color: 'red'
    })
  }

  return (
    <Dropzone
      className={className}
      loading={isParsing}
      accept={{ 'application/gpx+xml': ['.gpx'] }}
      onDrop={onDrop}
      onReject={onReject}
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
              color="var(--mantine-color-blue-6)"
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
            fw={600}
          >
            上傳 GPX 檔案
          </Text>
          <Text
            size="sm"
            c="dimmed"
            mt="xs"
            className="max-w-120"
          >
            拖曳檔案至此處，或點擊選擇
          </Text>
          <Text
            size="xs"
            c="dimmed"
            mt="xs"
          >
            支援 .gpx 格式
          </Text>
        </Stack>
      </Stack>
    </Dropzone>
  )
}
