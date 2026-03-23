import { ActionIcon, Tooltip } from '@mantine/core'
import { IconMountain, IconMountainOff } from '@tabler/icons-react'

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function MountainPeakToggle({ value, onChange }: Props) {
  return (
    <Tooltip
      label={value ? 'Hide mountain peaks' : 'Show mountain peaks'}
      position="left"
      withinPortal={false}
      openDelay={750}
    >
      <ActionIcon
        size="lg"
        variant="default"
        aria-label="Toggle mountain peaks"
        onClick={() => onChange(!value)}
      >
        {value ? (
          <IconMountain size={20} />
        ) : (
          <IconMountainOff size={20} />
        )}
      </ActionIcon>
    </Tooltip>
  )
}
