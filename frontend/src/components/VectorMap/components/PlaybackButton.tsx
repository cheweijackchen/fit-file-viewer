import { ActionIcon, Tooltip } from '@mantine/core'
import { IconPlayerPlay } from '@tabler/icons-react'

interface Props {
  disabled?: boolean;
  onClick: () => void;
}

export function PlaybackButton({ disabled, onClick }: Props) {
  return (
    <Tooltip
      label="Flyover"
      position="left"
      withinPortal={false}
      openDelay={750}
    >
      <ActionIcon
        size="lg"
        variant="default"
        disabled={disabled}
        aria-label="Start track flyover playback"
        onClick={onClick}
      >
        <IconPlayerPlay size={20} />
      </ActionIcon>
    </Tooltip>
  )
}
