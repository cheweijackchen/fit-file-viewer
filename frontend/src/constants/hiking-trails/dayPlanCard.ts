import { TrailNodeType } from '@/constants/hiking-trails/hikingTrail'

export interface PaceTier {
  maxHours: number;
  color: string;
  label: string;
}

export const PACE_TIERS: readonly PaceTier[] = [
  {
    maxHours: 5,
    color: 'var(--mantine-color-green-7)',
    label: 'Easy' 
  },
  {
    maxHours: 7,
    color: 'var(--mantine-color-yellow-7)',
    label: 'Normal' 
  },
  {
    maxHours: 9,
    color: 'var(--mantine-color-orange-6)',
    label: 'Long' 
  },
  {
    maxHours: Infinity,
    color: 'var(--mantine-color-red-6)',
    label: 'Exhausting' 
  },
]

export interface NodeTypeBadgeStyle {
  bg: string;
  iconColor: string;
  iconName: string;
}

export const TRAIL_NODE_TYPE_BADGE_STYLE: Record<TrailNodeType, NodeTypeBadgeStyle> = {
  [TrailNodeType.Hut]:         {
    bg: 'var(--mantine-color-stone-1)',
    iconColor: 'var(--mantine-color-stone-7)',
    iconName: 'home' 
  },
  [TrailNodeType.WaterSource]: {
    bg: 'var(--mantine-color-blue-1)',
    iconColor: 'var(--mantine-color-blue-7)',
    iconName: 'droplet' 
  },
  [TrailNodeType.Camp]:        {
    bg: 'var(--mantine-color-stone-1)',
    iconColor: 'var(--mantine-color-stone-7)',
    iconName: 'tent' 
  },
  [TrailNodeType.Peak]:        {
    bg: 'var(--mantine-color-yellow-0)',
    iconColor: 'var(--mantine-color-yellow-7)',
    iconName: 'mountain' 
  },
  [TrailNodeType.Fork]:        {
    bg: 'var(--mantine-color-gray-1)',
    iconColor: 'var(--mantine-color-gray-6)',
    iconName: 'git-branch-2' 
  },
  [TrailNodeType.Other]:       {
    bg: 'var(--mantine-color-gray-1)',
    iconColor: 'var(--mantine-color-gray-5)',
    iconName: 'map-pin' 
  },
}
