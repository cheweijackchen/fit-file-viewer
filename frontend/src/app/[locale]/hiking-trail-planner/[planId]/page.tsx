'use client'

import { ActionIcon, Button, Menu, Modal, Text } from '@mantine/core'
import { useScrollIntoView } from '@mantine/hooks'
import { IconDots, IconGitFork, IconPencil, IconPlus, IconTrash, IconX } from '@tabler/icons-react'
import { use, useMemo, useState } from 'react'
import { DayPlanCard } from '@/components/hikingTrail/DayPlanCard'
import { HIKING_TRAIL_MAP, HIKING_TRAILS } from '@/constants/hikingTrails'
import { Link, useRouter } from '@/i18n/navigation'
import { formatTrailMinutes } from '@/lib/timeFormatter'
import { buildTrailAdjacencyList, calculatePathTime } from '@/lib/trailGraph'
import type { DayPlan, Trail, TrailEdge, TrailNode } from '@/model/hikingTrail'
import { useHikingTrailActions, useHikingTrailStore } from '@/store/hikingTrail/useHikingTrailStore'
import { EditToolbar } from './components/EditToolbar'

interface Props {
  params: Promise<{ planId: string; }>;
  searchParams: Promise<{ edit?: string; }>;
}

export default function PlanDetailPage({ params, searchParams }: Props) {
  const { planId } = use(params)
  const { edit } = use(searchParams)
  const router = useRouter()

  const plans = useHikingTrailStore.use.plans()
  const { updatePlan, deletePlan } = useHikingTrailActions()
  const plan = plans.find((p) => p.id === planId)

  const [isEditing, setIsEditing] = useState(() => edit === 'true')
  const [editName, setEditName] = useState(() => (edit === 'true' ? plan?.name ?? '' : ''))
  const [editTrailIds, setEditTrailIds] = useState<string[]>(() =>
    edit === 'true' ? [...(plan?.trailIds ?? [])] : [],
  )
  const [editDays, setEditDays] = useState<DayPlan[]>(() =>
    edit === 'true'
      ? (plan?.days ?? []).map((d) => ({
        ...d,
        stops: [...d.stops] 
      }))
      : [],
  )
  const [editPaceMultiplier] = useState(() =>
    edit === 'true' ? (plan?.paceMultiplier ?? 1.0) : 1.0,
  )
  const [editingDayId, setEditingDayId] = useState<string | null>(null)
  const [editStopIds, setEditStopIds] = useState<string[]>([])
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'itinerary' | 'trip-stats' | 'trail-network'>('itinerary')

  const { scrollIntoView: scrollToItinerary, targetRef: itineraryRef } = useScrollIntoView<HTMLDivElement>({ offset: 108 })
  const { scrollIntoView: scrollToTripStats, targetRef: tripStatsRef } = useScrollIntoView<HTMLDivElement>({ offset: 108 })
  const { scrollIntoView: scrollToTrailNetwork, targetRef: trailNetworkRef } = useScrollIntoView<HTMLDivElement>({ offset: 108 })

  const trail = useMemo<Trail>(() => {
    const displayTrailIds = isEditing ? editTrailIds : (plan?.trailIds ?? [])
    const trails = displayTrailIds
      .map((id) => HIKING_TRAIL_MAP[id])
      .filter((t): t is Trail => Boolean(t))
    if (trails.length === 0) {
      return {
        id: 'empty',
        name: '',
        i18nKey: '',
        nodes: [],
        edges: [] 
      }
    }
    if (trails.length === 1) {
      return trails[0]!
    }
    const nodeMap = new Map<string, TrailNode>()
    const edges: TrailEdge[] = []
    for (const t of trails) {
      for (const n of t.nodes) {
        nodeMap.set(n.id, n)
      }
      edges.push(...t.edges)
    }
    return {
      id: 'merged',
      name: '',
      i18nKey: '',
      nodes: [...nodeMap.values()],
      edges 
    }
  }, [isEditing, editTrailIds, plan?.trailIds])

  const adj = useMemo(() => buildTrailAdjacencyList(trail), [trail])

  const totalRawMinutes = useMemo(
    () =>
      (plan?.days ?? []).reduce((sum, day) => {
        try {
          return sum + calculatePathTime(adj, day.stops.map((s) => s.nodeId))
        } catch {
          return sum
        }
      }, 0),
    [plan?.days, adj],
  )
  const totalWeightedMinutes = Math.round(totalRawMinutes * (plan?.paceMultiplier ?? 1))

  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32">
        <Text
          c="stone.5"
          size="lg"
        >
          計畫不存在
        </Text>
        <Link href="/hiking-trail-planner">
          <Text
            size="sm"
            c="stone.4"
            td="underline"
          >
            返回行程列表
          </Text>
        </Link>
      </div>
    )
  }

  function enterEditMode() {
    setIsEditing(true)
    setEditName(plan?.name ?? '')
    setEditTrailIds([...(plan?.trailIds ?? [])])
    setEditDays((plan?.days ?? []).map((d) => ({
      ...d,
      stops: [...d.stops] 
    })))
  }

  function cancelEditing() {
    setIsEditing(false)
    setEditingDayId(null)
    setEditStopIds([])
  }

  function finishEditing() {
    if (!plan) {
      return
    }
    updatePlan(planId, {
      ...plan,
      name: editName,
      trailIds: editTrailIds,
      days: editDays,
      paceMultiplier: editPaceMultiplier,
      updatedAt: Date.now(),
    })
    setIsEditing(false)
    setEditingDayId(null)
    setEditStopIds([])
  }

  const trailNames = plan.trailIds
    .map((id) => HIKING_TRAIL_MAP[id]?.name)
    .filter((n): n is string => Boolean(n))

  const availableTrailsToAdd = HIKING_TRAILS.filter((t) => !editTrailIds.includes(t.id))

  const displayDays = isEditing ? editDays : plan.days

  return (
    <div
      className="flex flex-col w-full min-h-full"
      style={{ background: 'var(--mantine-color-stone-1)' }}
    >
      {isEditing && (
        <EditToolbar
          onCancel={cancelEditing}
          onFinish={finishEditing}
        />
      )}

      {/* ─── Trip Header ─── */}
      <div
        className="flex flex-col gap-3 w-full"
        style={{
          padding: '24px 80px 28px',
          borderBottom: '1px solid var(--mantine-color-stone-2)' 
        }}
      >
        {/* Top row: breadcrumbs + dots menu */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Link href="/hiking-trail-planner">
              <Text
                size="sm"
                c="stone.4"
                className="hover:underline cursor-pointer"
              >
                My Trips
              </Text>
            </Link>
            <Text
              size="sm"
              c="stone.3"
            >
              /
            </Text>
            <Text
              size="sm"
              fw={600}
              c="stone.6"
            >
              {plan.name}
            </Text>
          </div>
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
                leftSection={<IconPencil size={14} />}
                onClick={enterEditMode}
              >
                編輯
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={() => setDeleteConfirmOpen(true)}
              >
                刪除
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        {/* Route chips */}
        {isEditing ? (
          <div className="flex flex-wrap items-center gap-2">
            {editTrailIds.map((id) => {
              const t = HIKING_TRAIL_MAP[id]
              if (!t) {
                return null
              }
              return (
                <div
                  key={id}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1 cursor-pointer"
                  style={{
                    background: 'var(--mantine-color-stone-1)',
                    border: '1px solid var(--mantine-color-stone-3)',
                  }}
                  onClick={() => setEditTrailIds((prev) => prev.filter((tid) => tid !== id))}
                >
                  <Text
                    size="xs"
                    fw={600}
                    c="stone.6"
                  >
                    {t.name}
                  </Text>
                  <IconX
                    size={12}
                    color="var(--mantine-color-stone-5)"
                  />
                </div>
              )
            })}
            {availableTrailsToAdd.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1 cursor-pointer"
                style={{ border: '1px dashed var(--mantine-color-stone-4)' }}
                onClick={() => setEditTrailIds((prev) => [...prev, t.id])}
              >
                <IconPlus
                  size={12}
                  color="var(--mantine-color-stone-5)"
                />
                <Text
                  size="xs"
                  fw={600}
                  c="stone.5"
                >
                  {t.name}
                </Text>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            {trailNames.map((name) => (
              <div
                key={name}
                className="rounded-full px-3 py-1"
                style={{ background: 'var(--mantine-color-stone-2)' }}
              >
                <Text
                  size="xs"
                  fw={600}
                  c="stone.6"
                >
                  {name}
                </Text>
              </div>
            ))}
          </div>
        )}

        {/* Title */}
        {isEditing ? (
          <div className="flex flex-col gap-1">
            <div
              className="rounded-lg inline-block"
              style={{
                border: '2px solid #FCC419',
                background: 'white',
                padding: '6px 12px',
              }}
            >
              <input
                type="text"
                value={editName}
                className="bg-transparent outline-none font-bold"
                style={{
                  fontSize: 36,
                  color: 'var(--mantine-color-stone-9)',
                  minWidth: 200,
                  width: `${Math.max(editName.length, 8)}ch`,
                }}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    finishEditing()
                  }
                  if (e.key === 'Escape') {
                    cancelEditing()
                  }
                }}
              />
            </div>
            <Text
              size="xs"
              c="stone.4"
            >
              Enter 儲存 · Esc 取消
            </Text>
          </div>
        ) : (
          <Text
            fw={700}
            c="stone.9"
            style={{ fontSize: 36 }}
          >
            {plan.name}
          </Text>
        )}

        {/* Stats row */}
        <div className="flex items-center gap-4">
          <Text
            size="sm"
            fw={600}
            c="stone.6"
          >
            {plan.days.length} 天
          </Text>
          <Text c="stone.3">·</Text>
          <Text
            size="sm"
            fw={600}
            c="stone.6"
          >
            {formatTrailMinutes(totalRawMinutes)} 總時間
          </Text>
          <Text c="stone.3">·</Text>
          <Text
            size="sm"
            c="stone.4"
          >
            ×{plan.paceMultiplier} · {formatTrailMinutes(totalWeightedMinutes)}
          </Text>
        </div>
      </div>

      {/* ─── Tab Nav ─── */}
      <div
        className="flex items-center justify-center w-full shrink-0"
        style={{
          height: 48,
          background: 'var(--mantine-color-stone-1)',
          borderBottom: '1px solid var(--mantine-color-stone-2)',
          position: 'sticky',
          top: 60,
          zIndex: 10,
        }}
      >
        <div className="flex h-full">
          {(
            [
              {
                id: 'itinerary',
                label: 'Itinerary',
                scroll: scrollToItinerary,
              },
              {
                id: 'trip-stats',
                label: 'Trip Stats',
                scroll: scrollToTripStats,
              },
              {
                id: 'trail-network',
                label: 'Trail Network',
                scroll: scrollToTrailNetwork,
              },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              className="flex items-center px-6 h-full cursor-pointer bg-transparent border-none"
              style={{
                borderBottom:
                  activeTab === tab.id
                    ? '2px solid var(--mantine-color-stone-9)'
                    : '2px solid transparent',
              }}
              onClick={() => {
                setActiveTab(tab.id)
                tab.scroll()
              }}
            >
              <Text
                size="sm"
                fw={activeTab === tab.id ? 600 : 400}
                c={activeTab === tab.id ? 'stone.9' : 'stone.4'}
              >
                {tab.label}
              </Text>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Content Area ─── */}
      <div
        className="flex gap-10 w-full"
        style={{ padding: '32px 80px 16px' }}
      >
        {/* Left column — Itinerary */}
        <div className="flex flex-col flex-1 min-w-0 gap-2.5">
          <div ref={itineraryRef}>
            <Text
              size="xs"
              fw={700}
              c="stone.5"
              style={{ letterSpacing: '0.08em' }}
            >
              ITINERARY
            </Text>
          </div>

          <div className="flex flex-col gap-2.5">
            {displayDays.map((day, idx) => {
              const isDayEditing = editingDayId === day.id
              return (
                <div
                  key={day.id}
                  className="@container/day-plan"
                >
                  <DayPlanCard
                    showOptions
                    dayPlan={day}
                    dayIndex={idx + 1}
                    trail={trail}
                    paceMultiplier={isEditing ? editPaceMultiplier : plan.paceMultiplier}
                    mode={isDayEditing ? 'edit' : 'view'}
                    editStopIds={isDayEditing ? editStopIds : undefined}
                    onEdit={() => {
                      const sourceDays = isEditing ? editDays : plan.days
                      const dayData = sourceDays.find((d) => d.id === day.id)
                      if (!isEditing) {
                        enterEditMode()
                      }
                      setEditingDayId(day.id)
                      setEditStopIds(dayData?.stops.map((s) => s.nodeId) ?? [])
                    }}
                    onCancelEdit={() => {
                      setEditingDayId(null)
                      setEditStopIds([])
                    }}
                    onClearRoute={() => setEditStopIds([])}
                    onStartingNodeChange={(nodeId) => setEditStopIds([nodeId])}
                    onNodeSelect={(nodeId) => setEditStopIds((prev) => [...prev, nodeId])}
                    onUndo={() => setEditStopIds((prev) => prev.slice(0, -1))}
                    onCompleteRoute={() => {
                      const captured = editStopIds
                      const capturedDayId = editingDayId
                      setEditDays((prev) =>
                        prev.map((d) =>
                          d.id === capturedDayId
                            ? {
                              ...d,
                              stops: captured.map((id) => ({ nodeId: id })) 
                            }
                            : d,
                        ),
                      )
                      setEditingDayId(null)
                      setEditStopIds([])
                    }}
                    onDelete={() => {
                      if (!isEditing) {
                        enterEditMode()
                      }
                      setEditDays((prev) => prev.filter((d) => d.id !== day.id))
                    }}
                  />
                </div>
              )
            })}
          </div>

          {isEditing && (
            <button
              type="button"
              className="flex items-center justify-center gap-1.5 w-full rounded-xl cursor-pointer"
              style={{
                padding: '20px 16px',
                background: 'var(--mantine-color-stone-1)',
                border: '1.5px dashed var(--mantine-color-stone-4)',
              }}
              onClick={() =>
                setEditDays((prev) => [
                  ...prev,
                  {
                    id: crypto.randomUUID(),
                    badges: [],
                    stops: [] 
                  },
                ])
              }
            >
              <IconPlus
                size={14}
                color="var(--mantine-color-stone-6)"
              />
              <Text
                size="sm"
                fw={600}
                c="stone.6"
              >
                Add Day
              </Text>
            </button>
          )}
        </div>

        {/* Right column — empty for now */}
        <div
          ref={tripStatsRef}
          className="shrink-0"
          style={{ width: 430 }}
        />
      </div>

      {/* ─── Trail Network Section ─── */}
      <div
        className="flex flex-col gap-3 w-full"
        style={{
          padding: '24px 80px 64px',
          borderTop: '1px solid var(--mantine-color-stone-2)',
        }}
      >
        <div ref={trailNetworkRef}>
          <Text
            size="xs"
            fw={700}
            c="stone.5"
            style={{ letterSpacing: '0.08em' }}
          >
            TRAIL NETWORK
          </Text>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-2.5 w-full rounded-2xl"
          style={{
            height: 320,
            background: 'var(--mantine-color-stone-1)',
            border: '1px solid var(--mantine-color-stone-2)',
          }}
        >
          <IconGitFork
            size={40}
            color="var(--mantine-color-stone-4)"
          />
          <Text
            size="md"
            fw={600}
            c="stone.4"
          >
            Trail Network
          </Text>
          <Text
            size="sm"
            c="stone.3"
          >
            視覺化圖表即將推出
          </Text>
        </div>
      </div>

      {/* ─── Delete Confirmation Modal ─── */}
      <Modal
        centered
        opened={deleteConfirmOpen}
        title="刪除行程"
        size="sm"
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <div className="flex flex-col gap-6">
          <Text
            size="sm"
            c="stone.6"
          >
            確定要刪除「{plan.name}」嗎？此操作無法復原。
          </Text>
          <div className="flex gap-2 justify-end">
            <Button
              variant="subtle"
              color="gray"
              onClick={() => setDeleteConfirmOpen(false)}
            >
              取消
            </Button>
            <Button
              color="red"
              onClick={() => {
                deletePlan(planId)
                router.push('/hiking-trail-planner')
              }}
            >
              刪除
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
