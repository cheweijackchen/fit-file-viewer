import type { TrailNodeType } from '@/constants/hiking-trails/hikingTrail'

export interface TrailNode {
  id: string;
  name: string;
  nameEn?: string;
  i18nKey: string;
  nodeType?: TrailNodeType;
}

export interface TrailEdge {
  from: string;           // node id
  to: string;             // node id
  minutes: number;        // walking time in minutes
  distance?: number;      // kilometer
  note?: string;
}

export interface Trail {
  id: string;
  name: string;
  nameEn?: string;
  i18nKey: string;
  description?: string;
  nodes: TrailNode[];
  edges: TrailEdge[];
}

// Runtime query structure, built from Trail.edges by buildTrailAdjacencyList()
export type TrailAdjacencyList = Map<string, Map<string, TrailEdge>>

export type InfoBadgeType = 'tent' | 'house' | 'droplet'

export interface RouteStop {
  nodeId: string;
}

export interface DayPlan {
  id: string;
  badges: InfoBadgeType[];
  stops: RouteStop[];
}

export interface HikingPlan {
  id: string;
  name: string;
  trailIds: string[];
  paceMultiplier: number;
  days: DayPlan[];
  createdAt: number;
  updatedAt: number;
}
