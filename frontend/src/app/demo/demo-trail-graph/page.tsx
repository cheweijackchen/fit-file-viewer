'use client'

import dynamic from 'next/dynamic'
import { Loader, Text, Title } from '@mantine/core'
import { southSecondSection } from '@/constants/hiking-trails/southSecondSection'
import type { ElementDefinition, Stylesheet } from 'cytoscape'

const CytoscapeComponent = dynamic(
  async () => {
    const [{ default: CytoscapeComp }, { default: cytoscape }, { default: dagre }] = await Promise.all([
      import('react-cytoscapejs'),
      import('cytoscape'),
      import('cytoscape-dagre'),
    ])
    cytoscape.use(dagre)
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
    data: { id: node.id, label: node.name },
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

const layout = {
  name: 'dagre',
  rankDir: 'TB',
  nodeSep: 40,
  rankSep: 60,
}

export default function DemoTrailGraph() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Title order={2}>Trail Graph — 南二段</Title>
      <Text c="dimmed">Adjacency list visualisation of South Second Section trail.</Text>
      <div className="w-full rounded border border-gray-200" style={{ height: 800 }}>
        <CytoscapeComponent
          elements={elements}
          stylesheet={stylesheet}
          layout={layout}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}
