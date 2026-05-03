'use client'

import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconUpload } from '@tabler/icons-react'
import { GpxUploader } from '@/components/GpxUploader'

export function MapHeaderCta() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Button
        px="xs"
        onClick={open}
      >
        <IconUpload />
        <span className="hidden md:block ml-2">Upload GPX</span>
      </Button>
      <Modal
        centered
        size="lg"
        opened={opened}
        onClose={close}
      >
        <GpxUploader onSuccess={close} />
      </Modal>
    </>
  )
}
