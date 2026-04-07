'use client'

import { Loader, SegmentedControl, Select, Text, Title } from '@mantine/core'
import type { ElementDefinition, StylesheetStyle } from 'cytoscape'
import dynamic from 'next/dynamic'
import { useMemo, useRef, useState } from 'react'
import { HIKING_TRAIL_MAP, HIKING_TRAILS } from '@/constants/hikingTrails'

const CytoscapeComponent = dynamic(
  async () => {
    const [{ default: CytoscapeComp }, { default: cytoscape }, { default: dagre }, { default: fcose }] = await Promise.all([
      import('react-cytoscapejs'),
      import('cytoscape'),
      import('cytoscape-dagre'),
      import('cytoscape-fcose'),
    ])
    cytoscape.use(dagre)
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

const trailSelectData = HIKING_TRAILS.map(trail => ({
  value: trail.id,
  label: trail.nameEn ?? trail.name,
}))

const stylesheet: StylesheetStyle[] = [
  {
    selector: 'node',
    style: {
      shape: 'rectangle',
      label: 'data(label)',
      'text-valign': 'center',
      'text-halign': 'center',
      padding: '8px',
      'font-size': '12px',
      'background-color': '#e7f5ff',
      'border-width': 1,
      'border-color': '#339af0',
      color: '#1864ab',
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
      'line-color': '#adb5bd',
      'target-arrow-color': '#adb5bd',
      color: '#495057',
    },
  },
]

const layoutConfigs: Record<string, object> = {
  dagre: {
    name: 'dagre',
    rankDir: 'TB',
    nodeSep: 60,
    rankSep: 80 
  },
  breadthfirst: {
    name: 'breadthfirst',
    directed: true,
    spacingFactor: 1.75,
    avoidOverlap: true 
  },
  cose: {
    name: 'cose',
    animate: false,
    nodeOverlap: 20,
    componentSpacing: 100,
    nodeRepulsion: () => 2000 
  },
  fcose: {
    name: 'fcose',
    animate: false,
    quality: 'proof',
    nodeSeparation: 100,
    nodeRepulsion: 2000,
    idealEdgeLength: 80 
  },
  circle: {
    name: 'circle',
    avoidOverlap: true,
    padding: 40 
  },
}

const layoutOptions = [
  {
    label: 'Dagre',
    value: 'dagre' 
  },
  {
    label: 'Breadth-first',
    value: 'breadthfirst' 
  },
  {
    label: 'CoSE',
    value: 'cose' 
  },
  {
    label: 'fCoSE',
    value: 'fcose' 
  },
  {
    label: 'Circle',
    value: 'circle' 
  },
]

export default function DemoTrailGraph() {
  const [selectedLayout, setSelectedLayout] = useState('dagre')
  const [selectedTrailId, setSelectedTrailId] = useState(HIKING_TRAILS[0].id)
  const cyRef = useRef<cytoscape.Core | null>(null)

  const selectedTrail = HIKING_TRAIL_MAP[selectedTrailId]
  const activeLayoutConfigs: Record<string, object> = useMemo(() => {
    const firstEdge = selectedTrail.edges[0]
    return {
      ...layoutConfigs,
      fcose: {
        ...layoutConfigs.fcose,
        relativePlacementConstraints: firstEdge !== undefined
          ? [{
            left: firstEdge.from,
            right: firstEdge.to,
          }]
          : [],
      },
    }
  }, [selectedTrail])

  const elements: ElementDefinition[] = [
    ...selectedTrail.nodes.map((node) => ({
      data: {
        id: node.id,
        label: node.name,
      },
    })),
    ...selectedTrail.edges.map((edge) => ({
      data: {
        id: `${edge.from}__${edge.to}`,
        source: edge.from,
        target: edge.to,
        label: `${edge.minutes}min`,
      },
    })),
  ]

  function applyLayout(cy: cytoscape.Core, layoutName: string) {
    const config = activeLayoutConfigs[layoutName]
    console.log('applying layout:', JSON.stringify(config, null, 2))
    cy.layout(activeLayoutConfigs[layoutName] as cytoscape.LayoutOptions).run()
  }

  function handleLayoutChange(value: string) {
    setSelectedLayout(value)
    if (cyRef.current) {
      applyLayout(cyRef.current, value)
    }
  }

  function handleTrailChange(value: string | null) {
    if (value === null) {
      return
    }
    setSelectedTrailId(value)
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <Title order={2}>Trail Graph — {selectedTrail.name}</Title>
      <Text c="dimmed">Adjacency list visualization of {selectedTrail.nameEn} trail.</Text>
      <Select
        data={trailSelectData}
        value={selectedTrailId}
        w={240}
        onChange={handleTrailChange}
      />
      <SegmentedControl
        value={selectedLayout}
        data={layoutOptions}
        onChange={handleLayoutChange}
      />
      <div
        className="w-full rounded border border-gray-200"
        style={{ height: 800 }}
      >
        <CytoscapeComponent
          key={selectedTrailId}
          elements={elements}
          stylesheet={stylesheet}
          layout={activeLayoutConfigs[selectedLayout] as cytoscape.LayoutOptions}
          cy={(cy) => {
            cyRef.current = cy
            applyLayout(cy, selectedLayout)
          }}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    </div>
  )
}
