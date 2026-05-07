'use client'
import { ActionIcon, Button, NumberInput, Popover, UnstyledButton } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

interface Props {
  nodeId: string;
  nodeName: string;
  value: number | undefined;
  onChange: (nodeId: string, minutes: number | undefined) => void;
  children: React.ReactNode;
}

export function RestPopover({ nodeId, nodeName, value, onChange, children }: Props) {
  const t = useTranslations('hiking-trail-planner')
  const [opened, setOpened] = useState(false)
  const [draft, setDraft] = useState<number | string>(value ?? '')

  function handleOpen() {
    setDraft(value ?? '')
    setOpened(true)
  }

  function handleClose() {
    setOpened(false)
  }

  function handleConfirm() {
    const parsed = typeof draft === 'number' ? draft : parseInt(String(draft), 10)
    onChange(nodeId, !isNaN(parsed) && parsed > 0 ? parsed : undefined)
    setOpened(false)
  }

  return (
    <Popover
      withArrow
      withinPortal
      opened={opened}
      position="bottom"
      shadow="md"
      onClose={handleClose}
    >
      <Popover.Target>
        <UnstyledButton
          className="cursor-pointer"
          onClick={handleOpen}
        >
          {children}
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="flex flex-col gap-2 w-48">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-(--mantine-color-stone-8)">
              {t('planDetail.dayPlanCard.restTime.popover.title', { nodeName })}
            </span>
            <ActionIcon
              size="xs"
              variant="subtle"
              color="stone"
              onClick={handleClose}
            >
              <IconX size={12} />
            </ActionIcon>
          </div>
          <NumberInput
            size="xs"
            min={0}
            max={300}
            step={5}
            placeholder="0"
            value={draft}
            rightSection={
              <span className="text-[10px] text-(--mantine-color-stone-5) pr-1">
                {t('planDetail.dayPlanCard.restTime.popover.minutesUnit')}
              </span>
            }
            rightSectionWidth={36}
            onChange={setDraft}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleConfirm()
              }
              if (e.key === 'Escape') {
                handleClose()
              }
            }}
          />
          <Button
            size="xs"
            color="yellow"
            onClick={handleConfirm}
          >
            {t('planDetail.dayPlanCard.restTime.popover.confirm')}
          </Button>
        </div>
      </Popover.Dropdown>
    </Popover>
  )
}
