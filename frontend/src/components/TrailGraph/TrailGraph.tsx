'use client'

import { Loader, useMantineTheme } from '@mantine/core'
import type { ElementDefinition, StylesheetStyle } from 'cytoscape'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useRef } from 'react'
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
}

export function TrailGraph({ trail, showGrid = false, gridSize = 40 }: Props) {
  const theme = useMantineTheme()
  const cyRef = useRef<cytoscape.Core | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const stylesheet = useMemo<StylesheetStyle[]>(() => [
    {
      selector: 'node',
      style: {
        shape: 'rectangle',
        label: 'data(label)',
        'text-valign': 'center',
        'text-halign': 'center',
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

  const layoutConfig = useMemo(() => ({
    name: 'fcose',
    animate: false,
    quality: 'proof',
    nodeSeparation: 100,
    nodeRepulsion: 2000,
    idealEdgeLength: 80,
    relativePlacementConstraints: trail.edges[0] !== undefined
      ? [{
        left: trail.edges[0].from,
        right: trail.edges[0].to 
      }]
      : [],
  }), [trail])

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

  useEffect(() => {
    const cy = cyRef.current
    const container = containerRef.current
    if (!cy || !container) {
      return
    }
    if (!showGrid) {
      container.style.backgroundImage = ''
      return
    }
    function updateGrid() {
      const pan = cy!.pan()
      const zoom = cy!.zoom()
      const size = gridSize * zoom
      container!.style.backgroundSize = `${size}px ${size}px`
      container!.style.backgroundPosition = `${pan.x}px ${pan.y}px`
      container!.style.backgroundImage =
        'linear-gradient(to right, #e9ecef 1px, transparent 1px), linear-gradient(to bottom, #e9ecef 1px, transparent 1px)'
    }
    updateGrid()
    cy.on('zoom pan', updateGrid)
    return () => {
      cy.off('zoom pan', updateGrid)
      container.style.backgroundImage = ''
    }
  }, [showGrid, gridSize])

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl border border-(--mantine-color-stone-2)"
      style={{ height: 500 }}
    >
      <CytoscapeComponent
        key={trail.id}
        elements={elements}
        stylesheet={stylesheet}
        layout={layoutConfig as cytoscape.LayoutOptions}
        cy={(cy) => {
          cyRef.current = cy
          cy.layout(layoutConfig as cytoscape.LayoutOptions).run()
        }}
        style={{
          width: '100%',
          height: '100%' 
        }}
      />
    </div>
  )
}
