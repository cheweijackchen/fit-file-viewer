'use client'

import type { Dispatch, SetStateAction } from 'react'
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
  const isDayEditing = editingDayId === day.id
  const isOtherDayEditing = editingDayId !== null && !isDayEditing
  const paceMultiplier = isEditing ? editPaceMultiplier : planPaceMultiplier

  function handleEditDay() {
    if (!isEditing) {
      onEnterEditMode()
    }
    onSetEditingDayId(day.id)
    onSetEditStopIds(day.stops.map((s) => s.nodeId))
  }

  function handleCancelEditDay() {
    onSetEditingDayId(null)
    onSetEditStopIds([])
  }

  function handleCompleteRoute() {
    const captured = editStopIds
    const capturedDayId = editingDayId
    onSetEditDays((prev) =>
      prev.map((d) =>
        d.id === capturedDayId
          ? {
            ...d,
            stops: captured.map((id) => ({ nodeId: id })) 
          }
          : d,
      ),
    )
    onSetEditingDayId(null)
    onSetEditStopIds([])
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
      dayPlan={day}
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
      onNodeSelect={(nodeId: string) => onSetEditStopIds((prev) => [...prev, nodeId])}
      onUndo={() => onSetEditStopIds((prev) => prev.slice(0, -1))}
      onCompleteRoute={handleCompleteRoute}
      onRouteExtended={(newStops) => onSetEditStopIds(newStops)}
      onDelete={handleDeleteDay}
    />
  )
}
