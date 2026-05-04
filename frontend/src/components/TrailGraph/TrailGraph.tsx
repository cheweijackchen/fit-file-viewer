'use client'

import { Loader, useMantineTheme } from '@mantine/core'
import { useDebouncedValue, useViewportSize } from '@mantine/hooks'
import type { ElementDefinition, StylesheetStyle } from 'cytoscape'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getTrailPositions } from '@/constants/hiking-trails/positions'
import type { Trail } from '@/model/hikingTrail'

const CytoscapeComponent = dynamic(
  async () => {
    const [{ default: CytoscapeComp }, { default: cytoscape }, { default: fcose }] = await Promise.all([
      import('react-cytoscapejs'),
      import('cytoscape'),
      import('cytoscape-fcose'),
    ])
    cytoscape.use(fcose)
    return CytoscapeComp
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-full h-full">
        <Loader />
      </div>
    ),
  }
)

interface Props {
  trail: Trail;
  showGrid?: boolean;
  gridSize?: number;
  editable?: boolean;
}

export function TrailGraph({ trail, showGrid = false, gridSize = 40, editable = false }: Props) {
  const theme = useMantineTheme()
  const cyRef = useRef<cytoscape.Core | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { width } = useViewportSize()
  const [debouncedWidth] = useDebouncedValue(width, 300)
  const prevWidthRef = useRef(debouncedWidth)
  const [shrinkKey, setShrinkKey] = useState(0)
  // Track the cy instance in state so effects can declare it as a dependency.
  // cyRef is kept in sync for imperative access; cyInstance drives re-registration
  // of event listeners whenever CytoscapeComponent remounts (trail change or shrinkKey bump).
  const [cyInstance, setCyInstance] = useState<cytoscape.Core | null>(null)

  useEffect(() => {
    if (debouncedWidth < prevWidthRef.current) {
      setShrinkKey(k => k + 1)
    }
    prevWidthRef.current = debouncedWidth
  }, [debouncedWidth])

  const stylesheet = useMemo<StylesheetStyle[]>(() => [
    {
      selector: 'node',
      style: {
        shape: 'round-rectangle',
        label: 'data(label)',
        'text-valign': 'center',
        'text-halign': 'center',
        width: '80px',
        height: '20px',
        padding: '8px',
        'font-size': '12px',
        'background-color': theme.colors.yellow[1],
        'border-width': 1,
        'border-color': theme.colors.yellow[5],
        color: theme.colors.yellow[8],
      },
    },
    {
      selector: 'edge',
      style: {
        label: 'data(label)',
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'font-size': '10px',
        'text-rotation': 'autorotate',
        'text-margin-y': -8,
        'line-color': theme.colors.stone[3],
        'target-arrow-color': theme.colors.stone[3],
        color: theme.colors.stone[6],
      },
    },
  ], [theme])

  const positions = useMemo(() => getTrailPositions(trail.id), [trail.id])

  const layoutConfig = useMemo(() => {
    if (positions !== undefined) {
      return {
        name: 'preset' as const,
        positions: (node: cytoscape.NodeSingular) => positions[node.id()] ?? {
          x: 0,
          y: 0,
        },
        fit: true,
        padding: 40,
      }
    }
    return {
      name: 'fcose',
      animate: false,
      quality: 'proof',
      nodeSeparation: 100,
      nodeRepulsion: 2000,
      idealEdgeLength: 80,
      relativePlacementConstraints: trail.edges[0] !== undefined
        ? [{
          left: trail.edges[0].from,
          right: trail.edges[0].to,
        }]
        : [],
    }
  }, [trail, positions])

  const elements = useMemo<ElementDefinition[]>(() => [
    ...trail.nodes.map((node) => ({
      data: {
        id: node.id,
        label: node.name 
      },
    })),
    ...trail.edges.map((edge) => ({
      data: {
        id: `${edge.from}__${edge.to}`,
        source: edge.from,
        target: edge.to,
        label: `${edge.minutes}min`,
      },
    })),
  ], [trail])

  // Stable callback passed to CytoscapeComponent. useCallback prevents react-cytoscapejs
  // from seeing a new function reference every render, which would cause it to call this
  // repeatedly and re-run the layout on top of the user's current view.
  const handleCy = useCallback((cy: cytoscape.Core) => {
    cyRef.current = cy
    setCyInstance(cy)
  }, [])

  // Apply initial setup whenever the cy instance is created or replaced.
  // CytoscapeComponent remounts (new instance) on trail change and viewport shrink (shrinkKey),
  // so this effect re-runs for each new instance — not just on first mount.
  useEffect(() => {
    if (!cyInstance) {
      return
    }
    cyInstance.autoungrabify(!editable)
    cyInstance.layout(layoutConfig as cytoscape.LayoutOptions).run()
  // layoutConfig and editable intentionally omitted: this runs only on new instance.
  // Changes to editable are handled by the effect below; layout re-runs are not desired
  // on every prop change (would overwrite the user's current viewport).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cyInstance])

  // Re-apply editable state when the prop changes after initial mount.
  useEffect(() => {
    cyInstance?.autoungrabify(!editable)
  }, [editable, cyInstance])

  useEffect(() => {
    const container = containerRef.current
    if (!cyInstance || !container) {
      return
    }
    if (!showGrid) {
      container.style.backgroundImage = ''
      return
    }
    function updateGrid() {
      const pan = cyInstance!.pan()
      const zoom = cyInstance!.zoom()
      const size = gridSize * zoom
      container!.style.backgroundSize = `${size}px ${size}px`
      container!.style.backgroundPosition = `${pan.x}px ${pan.y}px`
      container!.style.backgroundImage =
        'linear-gradient(to right, #e9ecef 1px, transparent 1px), linear-gradient(to bottom, #e9ecef 1px, transparent 1px)'
    }
    updateGrid()
    cyInstance.on('zoom pan', updateGrid)
    return () => {
      cyInstance.off('zoom pan', updateGrid)
      container.style.backgroundImage = ''
    }
  // cyInstance in deps ensures the listener is re-registered on every new cy instance,
  // not just when showGrid or gridSize changes.
  }, [showGrid, gridSize, cyInstance])

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl border border-(--mantine-color-stone-2)"
      style={{ height: 500 }}
    >
      <CytoscapeComponent
        key={`${trail.id}-${shrinkKey}`}
        elements={elements}
        stylesheet={stylesheet}
        layout={layoutConfig as cytoscape.LayoutOptions}
        cy={handleCy}
        style={{
          width: '100%',
          height: '100%' 
        }}
      />
    </div>
  )
}
