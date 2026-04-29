'use client'

import { ActionIcon, Container, Menu, Text } from '@mantine/core'
import { useScrollIntoView } from '@mantine/hooks'
import { IconDots, IconGitFork, IconPencil, IconPlus, IconTrash, IconX } from '@tabler/icons-react'
import { use, useMemo, useState } from 'react'
import { ConfirmModal } from '@/components/ConfirmModal'
import { DayPlanCard } from '@/components/hikingTrail/DayPlanCard'
import { HIKING_TRAIL_MAP, HIKING_TRAILS } from '@/constants/hikingTrails'
import { useLeaveConfirm } from '@/hooks/useLeaveConfirm'
import { Link, useRouter } from '@/i18n/navigation'
import { formatTrailMinutes } from '@/lib/timeFormatter'
import { buildTrailAdjacencyList, calculatePathTime } from '@/lib/trailGraph'
import type { DayPlan, Trail, TrailEdge, TrailNode } from '@/model/hikingTrail'
import { useHikingTrailActions, useHikingTrailStore } from '@/store/hikingTrail/useHikingTrailStore'
import { EditToolbar } from './components/EditToolbar'
import { PlanNotFound } from './components/PlanNotFound'

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

  const { modalProps: leaveModalProps } = useLeaveConfirm({
    shouldBlock: isEditing,
    title: '尚有未儲存的變更',
    description: '離開後，所有編輯中的內容將會遺失。確定要離開嗎？',
  })
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
    return <PlanNotFound />
  }

  function enterEditMode() {
    setIsEditing(true)
    setEditName(plan?.name ?? '')
    setEditTrailIds([...(plan?.trailIds ?? [])])
    setEditDays((plan?.days ?? []).map((d) => ({
      ...d,
      stops: [...d.stops]
    })))
    router.replace(`/hiking-trail-planner/${planId}?edit=true`)
  }

  function cancelEditing() {
    setIsEditing(false)
    setEditingDayId(null)
    setEditStopIds([])
    router.replace(`/hiking-trail-planner/${planId}`)
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
    router.replace(`/hiking-trail-planner/${planId}`)
  }

  const trailNames = plan.trailIds
    .map((id) => HIKING_TRAIL_MAP[id]?.name)
    .filter((n): n is string => Boolean(n))

  const availableTrailsToAdd = HIKING_TRAILS.filter((t) => !editTrailIds.includes(t.id))

  const displayDays = isEditing ? editDays : plan.days

  return (
    <div
      className="flex flex-col w-full min-h-full bg-(--mantine-color-stone-1)"
    >
      {isEditing && (
        <EditToolbar
          onCancel={cancelEditing}
          onFinish={finishEditing}
        />
      )}

      {/* ─── Trip Header ─── */}
      <Container
        size="xl"
        className="w-full flex flex-col gap-3 pt-6 pb-7"
      >
        {/* Top row: breadcrumbs + dots menu */}
        <div className="w-full flex items-center justify-between">
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
                  className="flex items-center gap-1.5 rounded-full px-3 py-1 cursor-pointer bg-(--mantine-color-stone-1) border border-(--mantine-color-stone-3)"
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
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1 cursor-pointer border border-dashed border-(--mantine-color-stone-4)"
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
                className="rounded-full px-3 py-1 bg-(--mantine-color-stone-2)"
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
              className="rounded-lg inline-block border-2 border-(--mantine-color-yellow-5) bg-white py-1.5 px-3"
            >
              <input
                type="text"
                value={editName}
                className="bg-transparent outline-none font-bold text-4xl text-(--mantine-color-stone-9) min-w-[200px]"
                style={{ width: `${Math.max(editName.length, 8)}ch` }}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <Text
            fw={700}
            c="stone.9"
            size="4xl"
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
      </Container>

      {/* ─── Tab Nav ─── */}
      <div
        className="flex items-center justify-center w-full shrink-0 h-12 bg-(--mantine-color-stone-1) border-b border-(--mantine-color-stone-2) sticky top-[60px] z-10"
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
              className={`flex items-center px-6 h-full cursor-pointer bg-transparent border-0 border-b-2 ${activeTab === tab.id ? 'border-(--mantine-color-stone-9)' : 'border-transparent'}`}
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
      <Container
        size="xl"
        className="w-full flex gap-10 pt-8 pb-4"
      >
        {/* Left column — Itinerary */}
        <div className="flex flex-col flex-1 min-w-0 gap-2.5">
          <div ref={itineraryRef}>
            <Text
              size="xs"
              fw={700}
              c="stone.5"
              className="tracking-[0.08em]"
            >
              ITINERARY
            </Text>
          </div>

          <div className="flex flex-col gap-2.5">
            {displayDays.map((day, idx) => {
              const isDayEditing = editingDayId === day.id
              const prevDayLastStopId = idx > 0 ? displayDays[idx - 1]?.stops.at(-1)?.nodeId : undefined
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
                    prevDayLastStopId={prevDayLastStopId}
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
              className="flex items-center justify-center gap-1.5 w-full rounded-xl cursor-pointer py-5 px-4 bg-(--mantine-color-stone-1) border-[1.5px] border-dashed border-(--mantine-color-stone-4)"
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
          className="shrink-0 w-[430px]"
        />
      </Container>

      {/* ─── Trail Network Section ─── */}
      <div
        className="border-t border-(--mantine-color-stone-2)"
      >
        <Container
          size="xl"
          className="w-full flex flex-col gap-3 pt-6 pb-16"
        >
          <div ref={trailNetworkRef}>
            <Text
              size="xs"
              fw={700}
              c="stone.5"
              className="tracking-[0.08em]"
            >
              TRAIL NETWORK
            </Text>
          </div>
          <div
            className="flex flex-col items-center justify-center gap-2.5 w-full rounded-2xl h-80 bg-(--mantine-color-stone-1) border border-(--mantine-color-stone-2)"
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
        </Container>
      </div>

      {/* ─── Leave Confirmation Modal ─── */}
      <ConfirmModal {...leaveModalProps} />

      {/* ─── Delete Confirmation Modal ─── */}
      <ConfirmModal
        opened={deleteConfirmOpen}
        title="刪除行程"
        description={`確定要刪除「${plan.name}」嗎？此操作無法復原。`}
        confirmLabel="刪除"
        confirmColor="red"
        onOk={() => {
          deletePlan(planId)
          router.push('/hiking-trail-planner')
        }}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </div>
  )
}
