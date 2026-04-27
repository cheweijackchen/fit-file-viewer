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

export default function DemoDayPlanCard() {
  const [paceMultiplier, setPaceMultiplier] = useState(1.0)

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
          style={{
            letterSpacing: '0.1em',
            color: 'var(--mantine-color-stone-5)' 
          }}
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

      {/* Edit mode */}
      <section className="flex flex-col gap-3">
        <Text
          size="xs"
          fw={700}
          tt="uppercase"
          style={{
            letterSpacing: '0.1em',
            color: 'var(--mantine-color-stone-5)' 
          }}
        >
          Edit Mode — 含操作選單
        </Text>
        <Stack gap={12}>
          {DEMO_DAYS.slice(0, 2).map((day, i) => (
            <DayPlanCard
              key={`edit-${day.id}`}
              dayPlan={day}
              dayIndex={i + 1}
              trail={southSecondSection}
              paceMultiplier={paceMultiplier}
              mode="edit"
              onEdit={() => notifications.show({
                message: `編輯 Day ${i + 1}`,
                color: 'blue' 
              })}
              onClearRoute={() => notifications.show({
                message: `清除 Day ${i + 1} 路線`,
                color: 'orange' 
              })}
              onDelete={() => notifications.show({
                message: `刪除 Day ${i + 1}`,
                color: 'red' 
              })}
            />
          ))}
        </Stack>
      </section>
    </div>
  )
}
