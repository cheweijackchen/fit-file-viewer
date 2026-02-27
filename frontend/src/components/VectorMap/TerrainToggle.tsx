import { ActionIcon, Tooltip } from '@mantine/core'
import { IconMountain, IconMountainOff } from '@tabler/icons-react'

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function TerrainToggle({ value, onChange }: Props) {
  return (
    <Tooltip
      label={value ? 'Disable Terrain' : 'Enable Terrain'}
      position="left"
      withinPortal={false}
      openDelay={750}
    >
      <ActionIcon
        size="lg"
        variant="default"
        aria-label="切換地形"
        onClick={() => onChange(!value)}
      >
        {value ? (
          <IconMountainOff size={20} />
        ) : (
          <IconMountain size={20} />
        )}
      </ActionIcon>
    </Tooltip>
  )
}
