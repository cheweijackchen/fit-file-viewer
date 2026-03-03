'use client'

import { Popover, ActionIcon, Tooltip, Text, UnstyledButton, Tabs, Switch } from '@mantine/core'
import { IconStack2, IconMap, IconSatellite, IconWorld } from '@tabler/icons-react'
import { type ComponentType } from 'react'
import { BASE_MAP_OPTIONS, type BaseMapMode } from '@/hooks/useBaseMap'
import styles from './MapOptionsPanel.module.scss'

const OPTION_ICONS: Record<BaseMapMode, ComponentType<{ size?: number; }>> = {
  standard: IconMap,
  satellite: IconSatellite,
  hybrid: IconWorld,
}

interface Props {
  value: BaseMapMode;
  onChange: (mapMode: BaseMapMode) => void;
  showTrackPoints: boolean;
  onTrackPointsChange: (value: boolean) => void;
  showWaypoints: boolean;
  onWaypointsChange: (value: boolean) => void;
  showWaypointLabels: boolean;
  onWaypointLabelsChange: (value: boolean) => void;
  hasWaypoints: boolean;
}

export function MapOptionsPanel({
  value,
  onChange,
  showTrackPoints,
  onTrackPointsChange,
  showWaypoints,
  onWaypointsChange,
  showWaypointLabels,
  onWaypointLabelsChange,
  hasWaypoints,
}: Props) {
  return (
    <Popover
      position="bottom-end"
      offset={6}
      withinPortal={false}
    >
      <Tooltip
        label="Map options"
        position="left"
        withinPortal={false}
        openDelay={750}
      >
        <Popover.Target>
          <ActionIcon
            size="lg"
            variant="default"
            aria-label="地圖選項"
          >
            <IconStack2 size={20} />
          </ActionIcon>
        </Popover.Target>
      </Tooltip>
      <Popover.Dropdown p="xs">
        <Tabs defaultValue="style">
          <Tabs.List mb="xs">
            <Tabs.Tab value="style">Map Style</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="style">
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
          </Tabs.Panel>

          <Tabs.Panel value="settings">
            <div className="flex flex-col gap-2">
              <Switch
                label="Show track points"
                size="sm"
                checked={showTrackPoints}
                onChange={(e) => onTrackPointsChange(e.currentTarget.checked)}
              />
              <Switch
                label="Show waypoints"
                size="sm"
                checked={showWaypoints}
                disabled={!hasWaypoints}
                onChange={(e) => onWaypointsChange(e.currentTarget.checked)}
              />
              <Switch
                label="Show waypoint labels"
                size="sm"
                checked={showWaypointLabels}
                disabled={!hasWaypoints || !showWaypoints}
                onChange={(e) => onWaypointLabelsChange(e.currentTarget.checked)}
              />
            </div>
          </Tabs.Panel>
        </Tabs>
      </Popover.Dropdown>
    </Popover>
  )
}
