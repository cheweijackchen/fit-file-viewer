'use client'

import { Loader, SegmentedControl, Text, Title } from '@mantine/core'
import type { ElementDefinition, Stylesheet } from 'cytoscape'
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { southSecondSection } from '@/constants/hiking-trails/southSecondSection'

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

const elements: ElementDefinition[] = [
  ...southSecondSection.nodes.map((node) => ({
    data: {
      id: node.id,
      label: node.name,
    },
  })),
  ...southSecondSection.edges.map((edge) => ({
    data: {
      id: `${edge.from}__${edge.to}`,
      source: edge.from,
      target: edge.to,
      label: `${edge.minutes}min`,
    },
  })),
]

const stylesheet: Stylesheet[] = [
  {
    selector: 'node',
    style: {
      shape: 'rectangle',
      label: 'data(label)',
      'text-valign': 'center',
      'text-halign': 'center',
      width: 'label',
      height: 'label',
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
    nodeRepulsion: () => 400000 
  },
  fcose: {
    name: 'fcose',
    animate: false,
    quality: 'proof',
    nodeSeparation: 100,
    nodeRepulsion: 8000,
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
  const cyRef = useRef<cytoscape.Core | null>(null)

  function handleLayoutChange(value: string) {
    setSelectedLayout(value)
    cyRef.current?.layout(layoutConfigs[value] as cytoscape.LayoutOptions).run()
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <Title order={2}>Trail Graph — 南二段</Title>
      <Text c="dimmed">Adjacency list visualization of South Second Section trail.</Text>
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
          elements={elements}
          stylesheet={stylesheet}
          layout={layoutConfigs[selectedLayout] as cytoscape.LayoutOptions}
          cy={(cy) => {
            cyRef.current = cy 
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
