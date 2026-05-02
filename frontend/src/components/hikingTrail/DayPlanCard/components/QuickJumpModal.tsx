'use client'

import { Button, Group, Modal, Select } from '@mantine/core'
import { useState } from 'react'
import type { TrailNode } from '@/model/hikingTrail'

interface Props {
  opened: boolean;
  onClose: () => void;
  onConfirm: (targetNodeId: string) => void;
  nodes: TrailNode[];
  currentNodeId?: string;
}

export function QuickJumpModal({ opened, onClose, onConfirm, nodes, currentNodeId }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectData = nodes
    .filter((n) => n.id !== currentNodeId)
    .map((n) => ({
      value: n.id,
      label: n.name 
    }))

  function handleConfirm() {
    if (!selectedId) {
      return
    }
    onConfirm(selectedId)
    setSelectedId(null)
  }

  function handleClose() {
    setSelectedId(null)
    onClose()
  }

  return (
    <Modal
      centered
      opened={opened}
      title="Jump to..."
      onClose={handleClose}
    >
      <Select
        searchable
        data={selectData}
        value={selectedId}
        placeholder="Select destination"
        onChange={setSelectedId}
      />
      <Group
        justify="flex-end"
        mt="md"
      >
        <Button
          variant="default"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          color="yellow"
          disabled={!selectedId}
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </Group>
    </Modal>
  )
}
