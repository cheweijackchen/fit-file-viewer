import type React from 'react'
import {
  IconDroplet,
  IconGitBranch,
  IconHome,
  IconMapPin,
  IconMountain,
  IconTent,
} from '@tabler/icons-react'
import { TrailNodeType } from '@/constants/hiking-trails/hikingTrail'

export interface PaceTier {
  maxHours: number;
  color: string;
  label: string;
}

export const PACE_TIERS: readonly PaceTier[] = [
  {
    maxHours: 5,
    color: 'green.7',
    label: 'Easy'
  },
  {
    maxHours: 7,
    color: 'yellow.7',
    label: 'Normal'
  },
  {
    maxHours: 9,
    color: 'orange.6',
    label: 'Long'
  },
  {
    maxHours: Infinity,
    color: 'red.6',
    label: 'Exhausting'
  },
]

export interface NodeTypeBadgeStyle {
  bg: string;
  iconColor: string;
  icon: React.ComponentType<{ size?: number; color?: string; stroke?: number }>;
}

export const TRAIL_NODE_TYPE_BADGE_STYLE: Record<TrailNodeType, NodeTypeBadgeStyle> = {
  [TrailNodeType.Hut]:         {
    bg: 'var(--mantine-color-stone-1)',
    iconColor: 'var(--mantine-color-stone-7)',
    icon: IconHome,
  },
  [TrailNodeType.WaterSource]: {
    bg: 'var(--mantine-color-blue-1)',
    iconColor: 'var(--mantine-color-blue-7)',
    icon: IconDroplet,
  },
  [TrailNodeType.Camp]:        {
    bg: 'var(--mantine-color-stone-1)',
    iconColor: 'var(--mantine-color-stone-7)',
    icon: IconTent,
  },
  [TrailNodeType.Peak]:        {
    bg: 'var(--mantine-color-yellow-0)',
    iconColor: 'var(--mantine-color-yellow-7)',
    icon: IconMountain,
  },
  [TrailNodeType.Fork]:        {
    bg: 'var(--mantine-color-gray-1)',
    iconColor: 'var(--mantine-color-gray-6)',
    icon: IconGitBranch,
  },
  [TrailNodeType.Other]:       {
    bg: 'var(--mantine-color-gray-1)',
    iconColor: 'var(--mantine-color-gray-5)',
    icon: IconMapPin,
  },
}
