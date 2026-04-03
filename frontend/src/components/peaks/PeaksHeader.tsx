'use client'

import { ActionIcon, Menu, Text, Title, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDotsVertical, IconHome, IconMoon, IconRotate, IconSun } from '@tabler/icons-react'
import { ConfirmModal } from '@/components/ConfirmModal'
import useScreen from '@/hooks/useScreen'

interface Props {
  showClear: boolean;
  onClear: () => void;
}

export function PeaksHeader({ showClear, onClear }: Props) {
  const { onMobile } = useScreen()
  const [opened, { open: openConfirmClearDialog, close: closeConfirmClearDialog }] = useDisclosure(false)
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })
  const isDark = computedColorScheme === 'dark'

  function handleConfirmClear() {
    onClear()
    closeConfirmClearDialog()
  }

  return (
    <div className="flex items-start justify-between w-full">
      <div className="flex flex-col gap-1">
        <Title
          c="bright"
          order={1}
          fz={onMobile ? 'h4' : 28}
          fw={600}
          style={{ letterSpacing: -1 }}
        >
          台灣百岳
        </Title>
        <Text
          size="xs"
          c="dimmed"
        >
          Taiwan 100 Peaks
        </Text>
      </div>
      <Menu position="bottom-start">
        <Menu.Target>
          <ActionIcon
            variant="subtle"
            size="md"
            color="dark"
          >
            <IconDotsVertical 
              size={20}
              stroke={1.5}
            />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown w="200">
          <Menu.Item
            component="a"
            href="/"
            leftSection={(
              <IconHome
                size={14}
              />
            )}
          >
            Home
          </Menu.Item>
          <Menu.Item
            leftSection={isDark ? <IconSun size={14} /> : <IconMoon size={14} />}
            onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
          >
            {isDark ? 'Light mode' : 'Dark mode'}
          </Menu.Item>
          {showClear && (
            <>
              <Menu.Divider />
              <Menu.Item
                leftSection={<IconRotate size={14} />}
                onClick={openConfirmClearDialog}
              >
                清除紀錄
              </Menu.Item>
            </>
          )}
        </Menu.Dropdown>
      </Menu>
      <ConfirmModal
        opened={opened}
        title="清除紀錄"
        description="確定要清除所有勾選紀錄嗎？"
        onOk={handleConfirmClear}
        onCancel={closeConfirmClearDialog}
      />
    </div>
  )
}
