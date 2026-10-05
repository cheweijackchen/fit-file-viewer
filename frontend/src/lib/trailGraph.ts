import type { TrailAdjacencyList, Trail, TrailEdge } from '@/model/hikingTrail'

/**
 * Builds a directed adjacency list from a trail's edge definitions.
 * O(E) construction. The returned map is: fromNodeId → (toNodeId → TrailEdge).
 */
export function buildTrailAdjacencyList(trail: Trail): TrailAdjacencyList {
  const adj: TrailAdjacencyList = new Map()

  for (const edge of trail.edges) {
    if (!adj.has(edge.from)) {
      adj.set(edge.from, new Map())
    }
    adj.get(edge.from)!.set(edge.to, edge)
  }

  return adj
}

/**
 * Returns the directed edge from → to, or undefined if no such edge exists.
 */
export function getEdge(adj: TrailAdjacencyList, from: string, to: string): TrailEdge | undefined {
  return adj.get(from)?.get(to)
}

/**
 * Returns all neighbor node IDs reachable directly from nodeId.
 * Returns an empty array if the node is not in the adjacency list.
 */
export function getNeighbors(adj: TrailAdjacencyList, nodeId: string): string[] {
  const neighbors = adj.get(nodeId)
  return neighbors ? Array.from(neighbors.keys()) : []
}

/**
 * Returns true if every consecutive pair in nodeIds has a directed edge.
 * Vacuously true for paths with 0 or 1 nodes.
 */
export function isValidPath(adj: TrailAdjacencyList, nodeIds: string[]): boolean {
  for (let i = 0; i < nodeIds.length - 1; i++) {
    if (getEdge(adj, nodeIds[i], nodeIds[i + 1]) === undefined) {
      return false
    }
  }
  return true
}

/**
 * Calculates the total walking time in minutes for a path.
 * Returns 0 for paths with 0 or 1 nodes.
 * Throws if any consecutive pair has no directed edge.
 */
export function calculatePathTime(adj: TrailAdjacencyList, nodeIds: string[]): number {
  let total = 0

  for (let i = 0; i < nodeIds.length - 1; i++) {
    const edge = getEdge(adj, nodeIds[i], nodeIds[i + 1])
    if (edge === undefined) {
      throw new Error(
        `No edge from '${nodeIds[i]}' to '${nodeIds[i + 1]}'`
      )
    }
    total += edge.minutes
  }

  return total
}

/**
 * Dijkstra's shortest path on the directed adjacency list.
 * Returns the full path [fromId, …, toId] by minimum total minutes,
 * or null if no path exists. Returns [fromId] when fromId === toId.
 */
export function findShortestPath(
  adj: TrailAdjacencyList,
  fromId: string,
  toId: string,
): string[] | null {
  if (fromId === toId) {
    return [fromId]
  }

  const dist = new Map<string, number>()
  const prev = new Map<string, string>()
  // [cost, nodeId] — we sort to simulate a min-priority queue
  const queue: Array<[number, string]> = [[0, fromId]]
  dist.set(fromId, 0)

  while (queue.length > 0) {
    queue.sort((a, b) => a[0] - b[0])
    const [cost, current] = queue.shift()!

    if (current === toId) {
      break
    }
    if (cost > (dist.get(current) ?? Infinity)) {
      continue
    }

    const neighbors = adj.get(current)
    if (!neighbors) {
      continue
    }

    for (const [neighbor, edge] of neighbors) {
      const newCost = cost + edge.minutes
      if (newCost < (dist.get(neighbor) ?? Infinity)) {
        dist.set(neighbor, newCost)
        prev.set(neighbor, current)
        queue.push([newCost, neighbor])
      }
    }
  }

  if (!dist.has(toId)) {
    return null
  }

  const path: string[] = []
  let cursor: string | undefined = toId
  while (cursor !== undefined) {
    path.unshift(cursor)
    cursor = prev.get(cursor)
  }

  return path[0] === fromId ? path : null
}

/**
 * Appends the shortest path from the last stop in currentStops to targetId.
 * Returns the merged stops array, or null if no path exists or currentStops is empty.
 */
export function applyQuickJump(
  currentStops: string[],
  targetId: string,
  adj: TrailAdjacencyList,
): string[] | null {
  if (currentStops.length === 0) {
    return null
  }
  const currentNodeId = currentStops[currentStops.length - 1]!
  if (currentNodeId === targetId) {
    return currentStops
  }
  const path = findShortestPath(adj, currentNodeId, targetId)
  if (path === null) {
    return null
  }
  return [...currentStops, ...path.slice(1)]
}
