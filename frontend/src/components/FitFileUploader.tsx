import { Stack, Text } from '@mantine/core';
import { Dropzone, type FileWithPath } from '@mantine/dropzone';
import { IconBike, IconUpload, IconX } from '@tabler/icons-react';
import FitParser from 'fit-file-parser';
import { useState } from 'react';
import { useFitDataStore } from '@/store/app/useFitDataStore';

const MAX_FILE_SIZE_IN_BYTES = 5 * (1024 ** 2)

export function FitFileUploader() {
  const [parseLoading, setParseLoading] = useState(false)
  const { setFileName, setFitData } = useFitDataStore()

  function onFileDrop(files: FileWithPath[]) {
    handleFitFile(files[0])
  }

  async function handleFitFile(file: File) {
    //TODO: validation

    try {
      setParseLoading(true)
      const buffer = await file.arrayBuffer()
      const fitParser = new FitParser({
        force: true,
        mode: 'list',
        speedUnit: 'km/h',
        lengthUnit: 'km'
      })

      await fitParser.parseAsync(buffer)
        .then((data) => {
          console.log(data)
          setFitData(data)
          setFileName(file.name)
        })
        .catch((error) => {
          // TODO: error handling
          console.warn('Parsing error:', error)
        })
    } catch (error) {

    } finally {
      setParseLoading(false)
    }
  }

  return (
    <Dropzone
      maxSize={MAX_FILE_SIZE_IN_BYTES}
      style={{
        'border-width': '3px'
      }}
      loading={parseLoading}
      onDrop={onFileDrop}
      onReject={(files) => console.log('rejected files', files)}
    >
      <Stack
        align="center"
        gap="xl"
        style={{ pointerEvents: 'none' }}
      >
        <div className="pt-6">
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
            <IconBike
              size={52}
              color="var(--mantine-color-dimmed)"
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
          >
            Upload your .fit file
          </Text>
          <Text
            size="sm"
            c="dimmed"
          >
            Drag file here or click to select files, each file should not exceed 5mb.
          </Text>
        </Stack>
      </Stack>
    </Dropzone >
  )
}
