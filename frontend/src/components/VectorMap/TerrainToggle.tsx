import { ActionIcon, Tooltip } from '@mantine/core'
import { IconMountain } from '@tabler/icons-react'

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function TerrainToggle({ value, onChange }: Props) {
  return (
    <Tooltip label="切換地形" position="left">
      <ActionIcon
        size={36}
        variant={value ? 'filled' : 'default'}
        aria-label="切換地形"
        onClick={() => onChange(!value)}
      >
        <IconMountain size={20} />
      </ActionIcon>
    </Tooltip>
  )
}
