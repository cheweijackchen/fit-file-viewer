import { ActionIcon, SegmentedControl, Slider, Text, Tooltip } from '@mantine/core'
import { IconPlayerPause, IconPlayerPlay, IconX } from '@tabler/icons-react'
import { formatElapsedTime } from '@/lib/timeFormatter'
import styles from './PlaybackBar.module.scss'

const SPEED_OPTIONS = [
  { value: '1', label: '1×' },
  { value: '2', label: '2×' },
  { value: '4', label: '4×' },
  { value: '8', label: '8×' },
]

interface Props {
  isPlaying: boolean;
  progress: number;       // 0–1
  currentTime: number;    // seconds
  totalDuration: number;  // seconds
  speed: number;
  onToggle: () => void;
  onSeek: (progress: number) => void;
  onSpeedChange: (speed: number) => void;
  onClose: () => void;
}

export function PlaybackBar({
  isPlaying,
  progress,
  currentTime,
  totalDuration,
  speed,
  onToggle,
  onSeek,
  onSpeedChange,
  onClose,
}: Props) {
  return (
    <div className={styles.bar}>
      <div className={styles.row}>
        <Tooltip
          label={isPlaying ? 'Pause' : 'Play'}
          position="top"
          withinPortal={false}
          openDelay={500}
        >
          <ActionIcon
            variant="subtle"
            color="white"
            size="lg"
            aria-label={isPlaying ? 'Pause playback' : 'Start playback'}
            onClick={onToggle}
          >
            {isPlaying
              ? <IconPlayerPause size={20} />
              : <IconPlayerPlay size={20} />}
          </ActionIcon>
        </Tooltip>

        <div className={styles.sliderWrap}>
          <Slider
            value={progress * 100}
            min={0}
            max={100}
            step={0.01}
            showLabelOnHover={false}
            size="xs"
            color="blue"
            onChange={v => onSeek(v / 100)}
          />
          <Text
            size="xs"
            c="white"
            className={styles.time}
          >
            {formatElapsedTime(currentTime * 1000)} / {formatElapsedTime(totalDuration * 1000)}
          </Text>
        </div>

        <SegmentedControl
          value={String(speed)}
          data={SPEED_OPTIONS}
          size="xs"
          color="blue"
          onChange={v => onSpeedChange(Number(v))}
        />

        <Tooltip
          label="Close"
          position="top"
          withinPortal={false}
          openDelay={500}
        >
          <ActionIcon
            variant="subtle"
            color="white"
            size="sm"
            aria-label="Close playback bar"
            onClick={onClose}
          >
            <IconX size={14} />
          </ActionIcon>
        </Tooltip>
      </div>
    </div>
  )
}
