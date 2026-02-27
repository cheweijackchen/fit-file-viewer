import { Menu, ActionIcon, Tooltip } from '@mantine/core'
import { IconStack2 } from '@tabler/icons-react'
import { BASE_MAP_OPTIONS, type BaseMapMode } from '@/hooks/useBaseMap'

interface Props {
  value: BaseMapMode;
  onChange: (mapMode: BaseMapMode) => void;
}

export function BaseMapSelector({ value, onChange }: Props) {
  return (
    <Menu
      position="bottom-end"
      offset={6}
      withinPortal={false}
    >
      <Tooltip
        label="Select Map Style"
        position="left"
        withinPortal={false}
      >
        <Menu.Target>
          <ActionIcon
            size="lg"
            variant="default"
            aria-label="選擇底圖"
          >
            <IconStack2 size={20} />
          </ActionIcon>
        </Menu.Target>
      </Tooltip>
      <Menu.Dropdown>
        {BASE_MAP_OPTIONS.map((option) => (
          <Menu.Item
            key={option.id}
            fw={option.id === value ? 600 : undefined}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
