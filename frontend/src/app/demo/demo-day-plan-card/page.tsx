'use client'

import { Slider, Stack, Text, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import { DayPlanCard } from '@/components/hikingTrail/DayPlanCard'
import { southSecondSection } from '@/constants/hiking-trails/southSecondSection'
import type { DayPlan } from '@/model/hikingTrail'

// Segments chosen to demonstrate all four pace tiers at paceMultiplier = 1.0:
//
// Day 1 — Easy  (~4h):   東埔溫泉 → 雲龍瀑布 → 樂樂山屋 → 觀高登山服務站
// Day 2 — Normal (~5.5h): 樂樂山屋 → 觀高坪 → 八通關草原
// Day 3 — Long  (~8.4h): 轆轆山屋 → 雲峰東峰三岔 → 西北鞍 → 南雙頭山 → 拉庫音溪
// Day 4 — Exhausting (~13.5h): 轆轆山屋 → ... → 嘉明湖避難山屋

const DEMO_DAYS: DayPlan[] = [
  {
    id: 'day-1',
    badges: [],
    stops: [
      { nodeId: 'global_dongpu-spring' },
      { nodeId: 'global_yunlong-fall' },
      { nodeId: 'global_lele-hut' },
      { nodeId: 'global_guangao-station' },
    ],
  },
  {
    id: 'day-2',
    badges: [],
    stops: [
      { nodeId: 'global_lele-hut' },
      { nodeId: 'global_guangao-ping' },
      { nodeId: 'south-second-section_batongguan-meadow' },
    ],
  },
  {
    id: 'day-3',
    badges: [],
    stops: [
      { nodeId: 'south-second-section_lulu-hut' },
      { nodeId: 'south-second-section_yun-mountain-fork-camp' },
      { nodeId: 'south-second-section_northwest-saddle-camp' },
      { nodeId: 'mountain_nanshuangtou-mountain' },
      { nodeId: 'south-second-section_lakuynxi-hut' },
    ],
  },
  {
    id: 'day-4',
    badges: [],
    stops: [
      { nodeId: 'south-second-section_lulu-hut' },
      { nodeId: 'south-second-section_yun-mountain-fork-camp' },
      { nodeId: 'south-second-section_northwest-saddle-camp' },
      { nodeId: 'mountain_nanshuangtou-mountain' },
      { nodeId: 'south-second-section_lakuynxi-hut' },
      { nodeId: 'south-second-section_sancha-mountain-trailhead' },
      { nodeId: 'south-second-section_jiaming-lake-fork' },
      { nodeId: 'south-second-section_jiaming-refuge-hut' },
    ],
  },
]

const SECTION_LABEL_STYLE = {
  letterSpacing: '0.1em',
  color: 'var(--mantine-color-stone-5)',
}

export default function DemoDayPlanCard() {
  const [paceMultiplier, setPaceMultiplier] = useState(1.0)
  const [planStops, setPlanStops] = useState<string[]>([])
  const [editDayIndex, setEditDayIndex] = useState<number | null>(null)
  const [editStops, setEditStops] = useState<string[]>([])

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl">
      <div>
        <Title order={2}>DayPlanCard</Title>
        <Text
          c="dimmed"
          size="sm"
          mt={4}
        >
          顯示單日登山行程：日期序號、路線節點、標準時間與個人節奏加權時間。
        </Text>
      </div>

      {/* Pace multiplier slider */}
      <div
        className="flex flex-col gap-2"
        style={{ maxWidth: 480 }}
      >
        <Text
          size="sm"
          fw={500}
        >
          個人腳程倍率：{paceMultiplier.toFixed(1)}×
        </Text>
        <Slider
          min={0.5}
          max={1.5}
          step={0.1}
          value={paceMultiplier}
          marks={[
            {
              value: 0.5,
              label: '0.5×' 
            },
            {
              value: 1.0,
              label: '1.0×' 
            },
            {
              value: 1.5,
              label: '1.5×' 
            },
          ]}
          color="yellow"
          onChange={setPaceMultiplier}
        />
      </div>

      {/* View mode */}
      <section className="flex flex-col gap-3">
        <Text
          size="xs"
          fw={700}
          tt="uppercase"
          style={SECTION_LABEL_STYLE}
        >
          View Mode — 四個腳程等級示例
        </Text>
        <Stack gap={12}>
          {DEMO_DAYS.map((day, i) => (
            <DayPlanCard
              key={day.id}
              dayPlan={day}
              dayIndex={i + 1}
              trail={southSecondSection}
              paceMultiplier={paceMultiplier}
              mode="view"
            />
          ))}
        </Stack>
      </section>

      {/* Edit mode — dots menu only (no active planning) */}
      <section className="flex flex-col gap-3">
        <Text
          size="xs"
          fw={700}
          tt="uppercase"
          style={SECTION_LABEL_STYLE}
        >
          Edit Mode — 含操作選單
        </Text>
        <Stack gap={12}>
          {DEMO_DAYS.slice(0, 2).map((day, i) => (
            <DayPlanCard
              key={`edit-${day.id}`}
              showOptions
              dayPlan={day}
              dayIndex={i + 1}
              trail={southSecondSection}
              paceMultiplier={paceMultiplier}
              mode={editDayIndex === i ? 'edit' : 'view'}
              editStopIds={editDayIndex === i ? editStops : undefined}
              onEdit={() => {
                setEditDayIndex(i)
                setEditStops(day.stops.map((s) => s.nodeId))
              }}
              onStartingNodeChange={(id) => setEditStops([id])}
              onNodeSelect={(id) => setEditStops((prev) => [...prev, id])}
              onUndo={() => setEditStops((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))}
              onCompleteRoute={() => {
                notifications.show({
                  message: `Day ${i + 1} 路線已完成！`,
                  color: 'green'
                })
                setEditDayIndex(null)
                setEditStops([])
              }}
              onClearRoute={() => {
                notifications.show({
                  message: `清除 Day ${i + 1} 路線`,
                  color: 'orange'
                })
                setEditDayIndex(null)
                setEditStops([])
              }}
              onDelete={() => notifications.show({
                message: `刪除 Day ${i + 1}`,
                color: 'red'
              })}
            />
          ))}
        </Stack>
      </section>

      {/* Planning Mode — DayPlanForm active */}
      <section className="flex flex-col gap-3">
        <Text
          size="xs"
          fw={700}
          tt="uppercase"
          style={SECTION_LABEL_STYLE}
        >
          Planning Mode — 行程規劃表單
        </Text>
        <Text
          size="xs"
          c="dimmed"
        >
          選擇起點開始規劃，點擊節點繼續走，Undo 還原上一步。
        </Text>
        <DayPlanCard
          showOptions
          dayPlan={DEMO_DAYS[0]!}
          dayIndex={1}
          trail={southSecondSection}
          paceMultiplier={paceMultiplier}
          mode="edit"
          editStopIds={planStops}
          onStartingNodeChange={(id) => setPlanStops([id])}
          onNodeSelect={(id) => setPlanStops((prev) => [...prev, id])}
          onUndo={() => setPlanStops((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))}
          onCompleteRoute={() => {
            notifications.show({
              message: '路線已完成！',
              color: 'green'
            })
            setPlanStops([])
          }}
          onClearRoute={() => setPlanStops([])}
          onDelete={() => notifications.show({
            message: '刪除 Day 1',
            color: 'red'
          })}
        />
      </section>
    </div>
  )
}
