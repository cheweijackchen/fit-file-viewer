'use client'

import { Button, Card, Code, FileInput, Group, Stack, Text, Title } from '@mantine/core'
import FitParser from 'fit-file-parser'
import { useState } from 'react'

export default function DemoFitFileParser() {
  const [fitFile, setFitFile] = useState<File | null>(null)
  const [fitData, setFitData] = useState<object | null>(null)

  function onParseButtonClick() {
    if (fitFile) {
      handleParse(fitFile)
    }
  }

  async function handleParse(file: File) {
    if (!file.name.toLowerCase().endsWith('.fit')) {
      // TODO: error handling
      console.warn('Please select a .fit file.')
      return
    }

    const buffer = await file.arrayBuffer()
    parseFitFile(buffer)
  }

  async function parseFitFile(buffer: ArrayBuffer | Buffer<ArrayBuffer>) {
    const fitParser = new FitParser({
      force: true,
      mode: 'list',
      speedUnit: 'km/h',
      lengthUnit: 'km'
    })

    await fitParser.parseAsync(buffer)
      .then((data) => {
        setFitData(data)
      })
      .catch((error) => {
        // TODO: error handling
        console.warn('Parsing error:', error)
      })
  }

  return (
    <Stack>
      <Card padding="xl">
        <Title order={1}>Fit File Parser</Title>
        <Text
          c="dimmed"
          size="sm"
        >
          Upload a .fit file to view the parsed result.
        </Text>
        <Group
          align="end"
          mt="xs"
        >
          <FileInput
            label="File"
            placeholder=".fit"
            className="flex-1"
            value={fitFile}
            onChange={setFitFile}
          />
          <Button
            className="flex-none"
            disabled={!fitFile}
            onClick={onParseButtonClick}
          >Parse</Button>
        </Group>
      </Card>
      <Code
        block
        className='mt-4'
      >{JSON.stringify(fitData, null, 2)}</Code>
    </Stack>
  )
}
