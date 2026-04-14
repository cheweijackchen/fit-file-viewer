'use client'

import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconUpload } from '@tabler/icons-react'
import { FitFileUploader } from '@/components/FitFileUploader'
import { useFitDataStoreBase } from '@/store/app/useFitDataStore'

export function FitFileViewerHeaderCta() {
  const hasFitData = useFitDataStoreBase(state => !!state.fitData)
  const [opened, { open, close }] = useDisclosure(false)

  if (!hasFitData) {
    return null
  }

  return (
    <>
      <Button
        px="xs"
        onClick={open}
      >
        <IconUpload />
        <span className="hidden md:block ml-2">Upload New File</span>
      </Button>
      <Modal
        centered
        size="lg"
        opened={opened}
        onClose={close}
      >
        <FitFileUploader onSuccess={close} />
      </Modal>
    </>
  )
}
