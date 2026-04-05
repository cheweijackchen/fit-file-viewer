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
