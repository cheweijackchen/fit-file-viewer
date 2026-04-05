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
