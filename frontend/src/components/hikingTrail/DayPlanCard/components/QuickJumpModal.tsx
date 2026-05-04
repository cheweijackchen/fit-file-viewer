'use client'

import { Button, Group, Modal, Select } from '@mantine/core'
import { useState } from 'react'
import { TRAIL_NODE_TYPE_BADGE_STYLE } from '@/constants/hiking-trails/dayPlanCard'
import { TrailNodeType } from '@/constants/hiking-trails/hikingTrail'
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

  const nodeTypeMap = new Map(nodes.map(n => [n.id, n.nodeType ?? TrailNodeType.Other]))

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
        renderOption={({ option }) => {
          const nodeType = nodeTypeMap.get(option.value) ?? TrailNodeType.Other
          const { icon: Icon } = TRAIL_NODE_TYPE_BADGE_STYLE[nodeType]
          return (
            <Group gap="xs">
              <Icon
                size={16}
                color="var(--mantine-color-stone-5)"
              />
              {option.label}
            </Group>
          )
        }}
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
