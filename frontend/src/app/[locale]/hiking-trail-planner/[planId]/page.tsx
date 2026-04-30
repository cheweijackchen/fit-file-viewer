'use client'

import { ActionIcon, Button, Container, Menu, Text } from '@mantine/core'
import { useScrollIntoView } from '@mantine/hooks'
import { IconDots, IconGitFork, IconPencil, IconPlus, IconTrash, IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { use, useMemo, useState } from 'react'
import { ConfirmModal } from '@/components/ConfirmModal'
import { HIKING_TRAIL_MAP, HIKING_TRAILS } from '@/constants/hikingTrails'
import { useLeaveConfirm } from '@/hooks/useLeaveConfirm'
import { Link, useRouter } from '@/i18n/navigation'
import { formatTrailMinutes } from '@/lib/timeFormatter'
import { buildTrailAdjacencyList, calculatePathTime } from '@/lib/trailGraph'
import type { DayPlan, Trail, TrailEdge, TrailNode } from '@/model/hikingTrail'
import { useHikingTrailActions, useHikingTrailStore } from '@/store/hikingTrail/useHikingTrailStore'
import { DayPlanCardWrapper } from './components/DayPlanCardWrapper'
import { EditToolbar } from './components/EditToolbar'
import { PlanNotFound } from './components/PlanNotFound'

const SCROLL_OFFSET = 108

const TABS = [
  {
    id: 'itinerary',
    label: 'Itinerary',
  },
  {
    id: 'trip-stats',
    label: 'Trip Stats',
  },
  {
    id: 'trail-network',
    label: 'Trail Network',
  },
] as const

interface Props {
  params: Promise<{ planId: string; }>;
  searchParams: Promise<{ edit?: string; }>;
}

export default function PlanDetailPage({ params, searchParams }: Props) {
  const { planId } = use(params)
  const { edit } = use(searchParams)
  const router = useRouter()

  const t = useTranslations('hiking-trail-planner')

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
    title: t('planDetail.leaveConfirm.title'),
    description: t('planDetail.leaveConfirm.description'),
  })
  const [activeTab, setActiveTab] = useState<'itinerary' | 'trip-stats' | 'trail-network'>('itinerary')

  const { scrollIntoView: scrollToItinerary, targetRef: itineraryRef } = useScrollIntoView<HTMLDivElement>({ offset: SCROLL_OFFSET })
  const { scrollIntoView: scrollToTripStats, targetRef: tripStatsRef } = useScrollIntoView<HTMLDivElement>({ offset: SCROLL_OFFSET })
  const { scrollIntoView: scrollToTrailNetwork, targetRef: trailNetworkRef } = useScrollIntoView<HTMLDivElement>({ offset: SCROLL_OFFSET })

  const tabs = [
    {
      ...TABS[0],
      label: t('planDetail.tabs.itinerary'),
      scroll: scrollToItinerary,
    },
    {
      ...TABS[1],
      label: t('planDetail.tabs.tripStats'),
      scroll: scrollToTripStats,
    },
    {
      ...TABS[2],
      label: t('planDetail.tabs.trailNetwork'),
      scroll: scrollToTrailNetwork,
    },
  ]

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

  function handleAddDay() {
    setEditDays((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        badges: [],
        stops: [],
      },
    ])
  }

  function handleDeleteConfirm() {
    deletePlan(planId)
    router.push('/hiking-trail-planner')
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
                {t('planDetail.myTrips')}
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
                {t('planDetail.edit')}
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={() => setDeleteConfirmOpen(true)}
              >
                {t('planDetail.delete')}
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
            {t('planDetail.stats.days', { count: plan.days.length })}
          </Text>
          <Text c="stone.3">·</Text>
          <Text
            size="sm"
            fw={600}
            c="stone.6"
          >
            {t('planDetail.stats.totalTime', { time: formatTrailMinutes(totalRawMinutes) })}
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
          {tabs.map((tab) => {
            function handleTabClick() {
              setActiveTab(tab.id)
              tab.scroll()
            }
            return (
              <button
                key={tab.id}
                type="button"
                className={`flex items-center px-6 h-full cursor-pointer bg-transparent border-0 border-b-2 ${activeTab === tab.id ? 'border-(--mantine-color-stone-9)' : 'border-transparent'}`}
                onClick={handleTabClick}
              >
                <Text
                  size="sm"
                  fw={activeTab === tab.id ? 600 : 400}
                  c={activeTab === tab.id ? 'stone.9' : 'stone.4'}
                >
                  {tab.label}
                </Text>
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── Content Area ─── */}
      <Container
        size="xl"
        className="w-full flex flex-col md:flex-row gap-4 lg:gap-6 pt-8 pb-4"
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
              {t('planDetail.sections.itinerary')}
            </Text>
          </div>

          <div className="flex flex-col gap-2.5">
            {displayDays.map((day, idx) => {
              const prevDayLastStopId = idx > 0 ? displayDays[idx - 1]?.stops.at(-1)?.nodeId : undefined
              return (
                <div
                  key={day.id}
                  className="@container/day-plan"
                >
                  <DayPlanCardWrapper
                    day={day}
                    dayIndex={idx + 1}
                    trail={trail}
                    isEditing={isEditing}
                    editingDayId={editingDayId}
                    editStopIds={editStopIds}
                    editPaceMultiplier={editPaceMultiplier}
                    planPaceMultiplier={plan.paceMultiplier}
                    prevDayLastStopId={prevDayLastStopId}
                    onEnterEditMode={enterEditMode}
                    onSetEditingDayId={setEditingDayId}
                    onSetEditStopIds={setEditStopIds}
                    onSetEditDays={setEditDays}
                  />
                </div>
              )
            })}
          </div>

          {isEditing && (
            <Button
              fullWidth
              variant="default"
              leftSection={<IconPlus size={14} />}
              c="stone.6"
              fw={600}
              className="rounded-xl border-dashed border-[1.5px] border-(--mantine-color-stone-4) bg-(--mantine-color-stone-1) h-auto py-5 px-4"
              onClick={handleAddDay}
            >
              {t('planDetail.addDay')}
            </Button>
          )}
        </div>

        {/* Right column — empty for now */}
        <div
          ref={tripStatsRef}
          className="shrink-0 w-full md:w-1/3 xl:w-[400px]"
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
              {t('planDetail.sections.trailNetwork')}
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
              {t('planDetail.trailNetworkPlaceholder.title')}
            </Text>
            <Text
              size="sm"
              c="stone.3"
            >
              {t('planDetail.trailNetworkPlaceholder.comingSoon')}
            </Text>
          </div>
        </Container>
      </div>

      {/* ─── Leave Confirmation Modal ─── */}
      <ConfirmModal {...leaveModalProps} />

      {/* ─── Delete Confirmation Modal ─── */}
      <ConfirmModal
        opened={deleteConfirmOpen}
        title={t('planDetail.deleteConfirm.title')}
        description={t('planDetail.deleteConfirm.description', { name: plan.name })}
        confirmLabel={t('planDetail.deleteConfirm.confirm')}
        confirmColor="red"
        onOk={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </div>
  )
}
