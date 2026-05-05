'use client'

import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { DayPlanCard } from '@/components/hikingTrail/DayPlanCard'
import type { DayPlan, Trail } from '@/model/hikingTrail'

interface Props {
  day: DayPlan;
  dayIndex: number;
  trail: Trail;
  isEditing: boolean;
  editingDayId: string | null;
  editStopIds: string[];
  editPaceMultiplier: number;
  planPaceMultiplier: number;
  prevDayLastStopId?: string;
  showDuration?: boolean;
  onEnterEditMode: () => void;
  onSetEditingDayId: Dispatch<SetStateAction<string | null>>;
  onSetEditStopIds: Dispatch<SetStateAction<string[]>>;
  onSetEditDays: Dispatch<SetStateAction<DayPlan[]>>;
}

export function DayPlanCardWrapper({
  day,
  dayIndex,
  trail,
  isEditing,
  editingDayId,
  editStopIds,
  editPaceMultiplier,
  planPaceMultiplier,
  prevDayLastStopId,
  showDuration,
  onEnterEditMode,
  onSetEditingDayId,
  onSetEditStopIds,
  onSetEditDays,
}: Props) {
  const [editStartingTime, setEditStartingTime] = useState<string | undefined>(undefined)

  const isDayEditing = editingDayId === day.id
  const isOtherDayEditing = editingDayId !== null && !isDayEditing
  const paceMultiplier = isEditing ? editPaceMultiplier : planPaceMultiplier

  function handleEditDay() {
    if (!isEditing) {
      onEnterEditMode()
    }
    onSetEditingDayId(day.id)
    onSetEditStopIds(day.stops.map((s) => s.nodeId))
    setEditStartingTime(day.startingTime)
  }

  function handleCancelEditDay() {
    onSetEditingDayId(null)
    onSetEditStopIds([])
    setEditStartingTime(undefined)
  }

  function handleCompleteRoute() {
    const captured = editStopIds
    const capturedDayId = editingDayId
    const capturedStartingTime = editStartingTime
    onSetEditDays((prev) =>
      prev.map((d) =>
        d.id === capturedDayId
          ? {
            ...d,
            stops: captured.map((id) => ({ nodeId: id })),
            startingTime: capturedStartingTime,
          }
          : d,
      ),
    )
    onSetEditingDayId(null)
    onSetEditStopIds([])
    setEditStartingTime(undefined)
  }

  function handleDeleteDay() {
    if (!isEditing) {
      onEnterEditMode()
    }
    onSetEditDays((prev) => prev.filter((d) => d.id !== day.id))
  }

  return (
    <DayPlanCard
      showOptions={isEditing}
      editDisabled={isOtherDayEditing}
      showDuration={showDuration}
      dayPlan={isDayEditing
        ? {
          ...day,
          startingTime: editStartingTime,
        }
        : day}
      dayIndex={dayIndex}
      trail={trail}
      paceMultiplier={paceMultiplier}
      mode={isDayEditing ? 'edit' : 'view'}
      editStopIds={isDayEditing ? editStopIds : undefined}
      prevDayLastStopId={prevDayLastStopId}
      onEdit={handleEditDay}
      onCancelEdit={handleCancelEditDay}
      onClearRoute={() => onSetEditStopIds([])}
      onStartingNodeChange={(nodeId: string) => onSetEditStopIds([nodeId])}
      onStartingTimeChange={(time) => setEditStartingTime(time || undefined)}
      onNodeSelect={(nodeId: string) => onSetEditStopIds((prev) => [...prev, nodeId])}
      onUndo={() => onSetEditStopIds((prev) => prev.slice(0, -1))}
      onCompleteRoute={handleCompleteRoute}
      onRouteExtended={(newStops) => onSetEditStopIds(newStops)}
      onDelete={handleDeleteDay}
    />
  )
}
