import { ActionIcon, NumberInput, Popover } from '@mantine/core'
import { IconCoffee, IconX } from '@tabler/icons-react'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import { formatTrailMinutes } from '@/lib/timeFormatter'
import type { TrailAdjacencyList, TrailNode } from '@/model/hikingTrail'

interface Props {
  stopIds: string[];
  nodeMap: Record<string, TrailNode>;
  highlightLast?: boolean;
  chipBackground?: string;
  fontWeight?: CSSProperties['fontWeight'];
  showDuration?: boolean;
  adj?: TrailAdjacencyList;
  // Rest time props
  editMode?: boolean;
  restMinutes?: Record<string, number>;
  onRestMinutesChange?: (nodeId: string, minutes: number | undefined) => void;
}

interface RestPopoverProps {
  nodeId: string;
  nodeName: string;
  value: number | undefined;
  onChange: (nodeId: string, minutes: number | undefined) => void;
  children: React.ReactNode;
}

function RestPopover({ nodeId, nodeName, value, onChange, children }: RestPopoverProps) {
  const [opened, setOpened] = useState(false)
  const [draft, setDraft] = useState<number | string>(value ?? '')

  function handleOpen() {
    setDraft(value ?? '')
    setOpened(true)
  }

  function handleConfirm() {
    const parsed = typeof draft === 'number' ? draft : parseInt(String(draft), 10)
    onChange(nodeId, !isNaN(parsed) && parsed > 0 ? parsed : undefined)
    setOpened(false)
  }

  function handleClear() {
    onChange(nodeId, undefined)
    setOpened(false)
  }

  return (
    <Popover
      withArrow
      withinPortal
      opened={opened}
      position="bottom"
      shadow="md"
      onClose={handleConfirm}
    >
      <Popover.Target>
        <button
          type="button"
          className="cursor-pointer"
          onClick={handleOpen}
        >
          {children}
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="flex flex-col gap-2 w-48">
          <span className="text-xs font-semibold text-(--mantine-color-stone-8)">
            {nodeName}
          </span>
          <div className="flex items-center gap-1.5">
            <NumberInput
              size="xs"
              min={0}
              max={300}
              step={5}
              placeholder="0"
              value={draft}
              className="flex-1"
              rightSection={
                <span className="text-[10px] text-(--mantine-color-stone-5) pr-1">分鐘</span>
              }
              rightSectionWidth={36}
              onChange={setDraft}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleConfirm()
                }
                if (e.key === 'Escape') {
                  setOpened(false)
                }
              }}
            />
            <ActionIcon
              size="sm"
              variant="subtle"
              color="stone"
              title="清除"
              onClick={handleClear}
            >
              <IconX size={12} />
            </ActionIcon>
          </div>
          <button
            type="button"
            className="text-xs font-semibold text-white bg-(--mantine-color-yellow-5) rounded-md py-1.5 cursor-pointer hover:bg-(--mantine-color-yellow-6)"
            onClick={handleConfirm}
          >
            確認
          </button>
        </div>
      </Popover.Dropdown>
    </Popover>
  )
}

export function RouteIndicator({
  stopIds,
  nodeMap,
  highlightLast = false,
  chipBackground = 'var(--mantine-color-stone-1)',
  fontWeight,
  showDuration = false,
  adj,
  editMode = false,
  restMinutes,
  onRestMinutesChange,
}: Props) {
  return (
    <div className="flex items-center flex-wrap gap-1">
      {stopIds.map((id, i) => {
        const isHighlighted = highlightLast && i === stopIds.length - 1
        const bg = isHighlighted ? 'var(--color-sepia-9)' : chipBackground
        const minutes = showDuration ? adj?.get(id)?.get(stopIds[i + 1])?.minutes : undefined
        const rest = restMinutes?.[id]

        const chip = (
          <div
            className="flex items-center rounded py-[3px] px-2 gap-1"
            style={{ background: bg }}
          >
            <span
              className={isHighlighted ? 'text-xs text-white' : 'text-xs text-(--mantine-color-stone-7)'}
              style={{ fontWeight }}
            >
              {nodeMap[id]?.name ?? id}
            </span>
            {rest !== undefined && rest > 0 && (
              <span className="flex items-center gap-0.5 text-[10px] text-(--mantine-color-stone-5)">
                <IconCoffee size={10} />
                {formatTrailMinutes(rest)}
              </span>
            )}
          </div>
        )

        return (
          <div
            key={id}
            className="flex items-center gap-1"
          >
            {editMode && onRestMinutesChange
              ? (
                <RestPopover
                  nodeId={id}
                  nodeName={nodeMap[id]?.name ?? id}
                  value={rest}
                  onChange={onRestMinutesChange}
                >
                  {chip}
                </RestPopover>
              )
              : chip}
            {i < stopIds.length - 1 && (
              showDuration
                ? (
                  <div className="relative w-[60px] flex items-center">
                    <span className="absolute -top-[14px] left-0 right-0 text-center text-[9px] text-(--mantine-color-stone-4) font-normal">
                      {minutes != null ? formatTrailMinutes(minutes) : ''}
                    </span>
                    <div className="flex-1 h-px bg-(--mantine-color-stone-4)" />
                    <svg
                      width={6}
                      height={8}
                      viewBox="0 0 6 8"
                    >
                      <path
                        d="M0 0l6 4-6 4z"
                        fill="var(--mantine-color-stone-4)"
                      />
                    </svg>
                  </div>
                )
                : (
                  <span className="text-xs text-(--mantine-color-stone-4)">→</span>
                )
            )}
          </div>
        )
      })}
    </div>
  )
}
