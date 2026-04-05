import { describe, expect, it } from 'vitest'
import type { Trail } from '@/model/hikingTrail'
import {
  buildTrailAdjacencyList,
  calculatePathTime,
  getEdge,
  getNeighbors,
  isValidPath,
} from './trailGraph'

// Minimal fixture: A → B (60 min), A → C (30 min), B → A (45 min), B → C (20 min), C → B (25 min)
const fixture: Trail = {
  id: 'test-trail',
  name: 'Test Trail',
  i18nKey: 'test-trail',
  nodes: [
    {
      id: 'A',
      name: 'Node A',
      i18nKey: 'test.a' 
    },
    {
      id: 'B',
      name: 'Node B',
      i18nKey: 'test.b' 
    },
    {
      id: 'C',
      name: 'Node C',
      i18nKey: 'test.c' 
    },
  ],
  edges: [
    {
      from: 'A',
      to: 'B',
      minutes: 60 
    },
    {
      from: 'A',
      to: 'C',
      minutes: 30 
    },
    {
      from: 'B',
      to: 'A',
      minutes: 45 
    },
    {
      from: 'B',
      to: 'C',
      minutes: 20 
    },
    {
      from: 'C',
      to: 'B',
      minutes: 25 
    },
    // Note: no C→A edge (disconnected in that direction)
  ],
}

describe('buildTrailAdjacencyList', () => {
  it('creates a map entry for each unique from-node', () => {
    const adj = buildTrailAdjacencyList(fixture)
    expect(adj.has('A')).toBe(true)
    expect(adj.has('B')).toBe(true)
    expect(adj.has('C')).toBe(true)
  })

  it('stores edges under the correct from→to keys', () => {
    const adj = buildTrailAdjacencyList(fixture)
    expect(adj.get('A')?.get('B')?.minutes).toBe(60)
    expect(adj.get('A')?.get('C')?.minutes).toBe(30)
    expect(adj.get('B')?.get('A')?.minutes).toBe(45)
  })

  it('respects directionality — A→B and B→A are separate edges', () => {
    const adj = buildTrailAdjacencyList(fixture)
    expect(adj.get('A')?.get('B')?.minutes).toBe(60)
    expect(adj.get('B')?.get('A')?.minutes).toBe(45)
  })

  it('returns an empty map for a trail with no edges', () => {
    const empty: Trail = {
      ...fixture,
      edges: [] 
    }
    const adj = buildTrailAdjacencyList(empty)
    expect(adj.size).toBe(0)
  })
})

describe('getEdge', () => {
  const adj = buildTrailAdjacencyList(fixture)

  it('returns the correct TrailEdge for an existing directed edge', () => {
    const edge = getEdge(adj, 'A', 'B')
    expect(edge).toBeDefined()
    expect(edge?.minutes).toBe(60)
    expect(edge?.from).toBe('A')
    expect(edge?.to).toBe('B')
  })

  it('returns undefined for a non-existent edge', () => {
    expect(getEdge(adj, 'C', 'A')).toBeUndefined()
  })

  it('returns undefined for an unknown from-node', () => {
    expect(getEdge(adj, 'Z', 'A')).toBeUndefined()
  })
})

describe('getNeighbors', () => {
  const adj = buildTrailAdjacencyList(fixture)

  it('returns all direct neighbor IDs', () => {
    const neighbors = getNeighbors(adj, 'A')
    expect(neighbors).toHaveLength(2)
    expect(neighbors).toContain('B')
    expect(neighbors).toContain('C')
  })

  it('returns neighbors for a node with one outgoing edge', () => {
    const neighbors = getNeighbors(adj, 'C')
    expect(neighbors).toEqual(['B'])
  })

  it('returns an empty array for an unknown node', () => {
    expect(getNeighbors(adj, 'Z')).toEqual([])
  })
})

describe('isValidPath', () => {
  const adj = buildTrailAdjacencyList(fixture)

  it('returns true for a valid multi-step path', () => {
    expect(isValidPath(adj, ['A', 'B', 'C'])).toBe(true)
  })

  it('returns false when a step has no directed edge', () => {
    // C→A does not exist
    expect(isValidPath(adj, ['C', 'A'])).toBe(false)
  })

  it('returns true for a single-node path (vacuously valid)', () => {
    expect(isValidPath(adj, ['A'])).toBe(true)
  })

  it('returns true for an empty path', () => {
    expect(isValidPath(adj, [])).toBe(true)
  })
})

describe('calculatePathTime', () => {
  const adj = buildTrailAdjacencyList(fixture)

  it('sums minutes correctly for a multi-step path', () => {
    // A→B (60) + B→C (20) = 80
    expect(calculatePathTime(adj, ['A', 'B', 'C'])).toBe(80)
  })

  it('returns 0 for a single-node path', () => {
    expect(calculatePathTime(adj, ['A'])).toBe(0)
  })

  it('returns 0 for an empty path', () => {
    expect(calculatePathTime(adj, [])).toBe(0)
  })

  it('throws when a step has no directed edge', () => {
    expect(() => calculatePathTime(adj, ['C', 'A'])).toThrow("No edge from 'C' to 'A'")
  })
})
