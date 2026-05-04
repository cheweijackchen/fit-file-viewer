'use client'

import { ActionIcon, Menu, Switch } from '@mantine/core'
import { IconChevronRight, IconDots, IconPencil, IconSettings, IconTrash } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

interface Props {
  onEnterEditMode: () => void;
  onDeleteConfirmOpen: () => void;
  showDuration: boolean;
  onShowDurationChange: (value: boolean) => void;
}

export function PlanDetailMenu({
  onEnterEditMode,
  onDeleteConfirmOpen,
  showDuration,
  onShowDurationChange,
}: Props) {
  const t = useTranslations('hiking-trail-planner')

  return (
    <Menu
      withinPortal
      position="bottom-end"
    >
      <Menu.Target>
        <ActionIcon
          size={32}
          radius="xl"
          color="stone.1"
          c="stone.6"
        >
          <IconDots size={16} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          c="bright"
          color="stone"
          leftSection={<IconPencil size={14} />}
          onClick={onEnterEditMode}
        >
          {t('planDetail.edit')}
        </Menu.Item>

        <Menu
          withinPortal
          trigger="hover"
          position="left-start"
        >
          <Menu.Target>
            <Menu.Item
              c="bright"
              color="stone"
              leftSection={<IconSettings size={14} />}
              rightSection={<IconChevronRight size={12} />}
            >
              {t('planDetail.settings')}
            </Menu.Item>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item 
              c="bright"
              color="stone"
              closeMenuOnClick={false}
            >
              {/* onMouseDown: Mantine's click-outside handler fires on mousedown, before onClick.
                  Both portals are DOM siblings, so the outer menu treats clicks here as outside. */}
              <Switch
                label={t('planDetail.showDuration')}
                checked={showDuration}
                onChange={(e) => onShowDurationChange(e.currentTarget.checked)}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              />
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Menu.Divider />
        <Menu.Item
          color="red"
          leftSection={<IconTrash size={14} />}
          onClick={onDeleteConfirmOpen}
        >
          {t('planDetail.delete')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
