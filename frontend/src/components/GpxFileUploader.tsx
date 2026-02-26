import { Stack, Text } from '@mantine/core'
import { Dropzone, type FileWithPath } from '@mantine/dropzone'
import { IconMap, IconUpload, IconX } from '@tabler/icons-react'

interface Props {
  className?: string;
  onFile: (file: File) => void;
  isParsing: boolean;
}

export function GpxFileUploader({ className, onFile, isParsing }: Props) {
  function onDrop(files: FileWithPath[]) {
    const file = files[0]
    if (file?.name.toLowerCase().endsWith('.gpx')) {
      onFile(file)
    }
  }

  return (
    <Dropzone
      className={className}
      loading={isParsing}
      onDrop={onDrop}
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
