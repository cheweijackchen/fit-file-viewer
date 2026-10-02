import { describe, expect, it } from 'vitest'
import { tripExamples } from '@/components/hikingTrail/StartFromPlanSection/examples'
import { getTrailPositions } from '@/constants/hiking-trails/positions'
import { HIKING_TRAILS } from '@/constants/hikingTrails'
import { buildTrailAdjacencyList } from '@/lib/trailGraph'
import type { Trail, TrailNode } from '@/model/hikingTrail'

const SHARED_PREFIXES = ['global_', 'mountain_']

function nodeIds(trail: Trail): Set<string> {
  return new Set(trail.nodes.map(n => n.id))
}

function isSharedId(id: string): boolean {
  return SHARED_PREFIXES.some(prefix => id.startsWith(prefix))
}

describe.each(HIKING_TRAILS.map(trail => [trail.id, trail] as const))('trail data integrity: %s', (_trailId, trail) => {
  const ids = nodeIds(trail)

  it('has unique node ids', () => {
    expect(ids.size).toBe(trail.nodes.length)
  })

  it('uses the trail id, global_ or mountain_ as node id prefix', () => {
    const invalid = trail.nodes
      .map(n => n.id)
      .filter(id => !isSharedId(id) && !id.startsWith(`${trail.id}_`))
    expect(invalid).toEqual([])
  })

  it('derives i18nKey namespace from the node id prefix', () => {
    const invalid = trail.nodes.filter((n) => {
      const [prefix, ...rest] = n.id.split('_')
      return n.i18nKey !== `${prefix}.${rest.join('_')}`
    }).map(n => n.id)
    expect(invalid).toEqual([])
  })

  it('has every edge endpoint defined as a node', () => {
    const dangling = trail.edges
      .flatMap(e => [e.from, e.to])
      .filter(id => !ids.has(id))
    expect(dangling).toEqual([])
  })

  it('has a reverse edge for every edge', () => {
    const adjacency = buildTrailAdjacencyList(trail)
    const missing = trail.edges
      .filter(e => !adjacency.get(e.to)?.has(e.from))
      .map(e => `${e.from} -> ${e.to}`)
    expect(missing).toEqual([])
  })

  it('has positive minutes on every edge', () => {
    const invalid = trail.edges.filter(e => !(e.minutes > 0))
    expect(invalid).toEqual([])
  })

  it('has preset positions for exactly its nodes', () => {
    const positions = getTrailPositions(trail.id)
    expect(positions).toBeDefined()
    const positionIds = new Set(Object.keys(positions ?? {}))
    expect([...ids].filter(id => !positionIds.has(id))).toEqual([])
    expect([...positionIds].filter(id => !ids.has(id))).toEqual([])
  })
})

describe('shared nodes across trails', () => {
  it('defines global_ and mountain_ nodes identically wherever they appear', () => {
    const seen = new Map<string, { trailId: string; node: TrailNode; }>()
    const conflicts: string[] = []
    for (const trail of HIKING_TRAILS) {
      for (const node of trail.nodes) {
        if (!isSharedId(node.id)) {
          continue
        }
        const previous = seen.get(node.id)
        if (!previous) {
          seen.set(node.id, {
            trailId: trail.id,
            node
          })
          continue
        }
        if (previous.node.name !== node.name || previous.node.nodeType !== node.nodeType) {
          conflicts.push(`${node.id}: ${previous.trailId} vs ${trail.id}`)
        }
      }
    }
    expect(conflicts).toEqual([])
  })
})

describe('example plans', () => {
  it.each(tripExamples.map(example => [example.name, example] as const))('%s references existing, connected nodes', (_name, example) => {
    const trails = HIKING_TRAILS.filter(t => example.trailIds.includes(t.id))
    expect(trails.length).toBe(example.trailIds.length)

    const merged: Trail = {
      id: 'merged',
      name: 'merged',
      i18nKey: 'merged',
      nodes: [...new Map(trails.flatMap(t => t.nodes).map(n => [n.id, n])).values()],
      edges: trails.flatMap(t => t.edges),
    }
    const ids = nodeIds(merged)
    const adjacency = buildTrailAdjacencyList(merged)

    const unknown: string[] = []
    const disconnected: string[] = []
    for (const day of example.days) {
      day.stops.forEach((stop, index) => {
        if (!ids.has(stop.nodeId)) {
          unknown.push(stop.nodeId)
        }
        const next = day.stops[index + 1]
        if (next && !adjacency.get(stop.nodeId)?.has(next.nodeId)) {
          disconnected.push(`${stop.nodeId} -> ${next.nodeId}`)
        }
      })
    }
    expect(unknown).toEqual([])
    expect(disconnected).toEqual([])
  })
})
