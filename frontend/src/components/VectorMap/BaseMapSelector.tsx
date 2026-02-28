import { Popover, ActionIcon, Tooltip, Text, UnstyledButton } from '@mantine/core'
import { IconStack2, IconMap, IconSatellite, IconWorld } from '@tabler/icons-react'
import { type ComponentType } from 'react'
import { BASE_MAP_OPTIONS, type BaseMapMode } from '@/hooks/useBaseMap'
import styles from './BaseMapSelector.module.scss'

const OPTION_ICONS: Record<BaseMapMode, ComponentType<{ size?: number; }>> = {
  standard: IconMap,
  satellite: IconSatellite,
  hybrid: IconWorld,
}

interface Props {
  value: BaseMapMode;
  onChange: (mapMode: BaseMapMode) => void;
}

export function BaseMapSelector({ value, onChange }: Props) {
  return (
    <Popover
      position="bottom-end"
      offset={6}
      withinPortal={false}
    >
      <Tooltip
        label="Select map style"
        position="left"
        withinPortal={false}
        openDelay={750}
      >
        <Popover.Target>
          <ActionIcon
            size="lg"
            variant="default"
            aria-label="選擇底圖"
          >
            <IconStack2 size={20} />
          </ActionIcon>
        </Popover.Target>
      </Tooltip>
      <Popover.Dropdown p="xs">
        <Text
          size="xs"
          fw={600}
          c="dimmed"
          mb="xs"
        >
          Map Style
        </Text>
        <div className="flex gap-2">
          {BASE_MAP_OPTIONS.map((option) => {
            const Icon = OPTION_ICONS[option.id]
            const isSelected = option.id === value
            return (
              <UnstyledButton
                key={option.id}
                className={styles.tile}
                data-selected={isSelected || undefined}
                onClick={() => onChange(option.id)}
              >
                <div className={styles.thumbnail}>
                  <Icon size={24} />
                </div>
                <Text
                  size="xs"
                  ta="center"
                  mt={4}
                  fw={isSelected ? 600 : undefined}
                >
                  {option.label}
                </Text>
              </UnstyledButton>
            )
          })}
        </div>
      </Popover.Dropdown>
    </Popover>
  )
}
