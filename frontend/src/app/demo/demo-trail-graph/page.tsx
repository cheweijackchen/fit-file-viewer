'use client'

import { Button, Group, Loader, SegmentedControl, Select, Switch, Text, Title } from '@mantine/core'
import type { ElementDefinition, StylesheetStyle } from 'cytoscape'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
      shape: 'round-rectangle',
      label: 'data(label)',
      'text-valign': 'center',
      'text-halign': 'center',
      width: '80px',
      height: '20px',
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

const GRID_SIZE = 40

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
  const importInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [showGrid, setShowGrid] = useState(false)
  const [snapToGrid, setSnapToGrid] = useState(false)
  const [cyInstance, setCyInstance] = useState<cytoscape.Core | null>(null)

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
    cy.layout(config as cytoscape.LayoutOptions).run()
  }

  const handleCy = useCallback((cy: cytoscape.Core) => {
    cyRef.current = cy
    setCyInstance(cy)
  }, [])

  useEffect(() => {
    if (!cyInstance) {
      return
    }
    applyLayout(cyInstance, selectedLayout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cyInstance])

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
      const size = GRID_SIZE * zoom
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
  }, [showGrid, cyInstance])

  useEffect(() => {
    if (!cyInstance || !snapToGrid) {
      return
    }
    function snapNode(e: cytoscape.EventObject) {
      const node = e.target as cytoscape.NodeSingular
      const pos = node.position()
      node.position({
        x: Math.round(pos.x / GRID_SIZE) * GRID_SIZE,
        y: Math.round(pos.y / GRID_SIZE) * GRID_SIZE,
      })
    }
    cyInstance.on('dragfree', 'node', snapNode)
    return () => {
      cyInstance.off('dragfree', 'node', snapNode)
    }
  }, [snapToGrid, cyInstance])

  function handleExport() {
    const cy = cyRef.current
    if (!cy) {
      return
    }
    const positions: Record<string, { x: number; y: number; }> = {}
    cy.nodes().forEach(node => {
      positions[node.id()] = node.position()
    })
    const blob = new Blob([JSON.stringify({
      trailId: selectedTrailId,
      positions 
    }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedTrailId}-positions.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImportClick() {
    importInputRef.current?.click()
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target?.result as string) as { positions: Record<string, { x: number; y: number; }>; }
        const cy = cyRef.current
        if (!cy) {
          return
        }
        cy.nodes().forEach(node => {
          const pos = json.positions[node.id()]
          if (pos) {
            node.position(pos)
          }
        })
        cy.fit()
      } catch {
        alert('Invalid JSON file')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
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
      <Group>
        <Button
          variant="default"
          onClick={handleExport}
        >Export Positions</Button>
        <Button
          variant="default"
          onClick={handleImportClick}
        >Import Positions</Button>
        <input
          ref={importInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImportFile}
        />
        <Switch
          checked={showGrid}
          label="Show Grid"
          onChange={(e) => setShowGrid(e.currentTarget.checked)}
        />
        <Switch
          checked={snapToGrid}
          label="Snap to Grid"
          onChange={(e) => setSnapToGrid(e.currentTarget.checked)}
        />
      </Group>
      <div
        ref={containerRef}
        className="w-full rounded border border-gray-200"
        style={{ height: 800 }}
      >
        <CytoscapeComponent
          key={selectedTrailId}
          elements={elements}
          stylesheet={stylesheet}
          layout={activeLayoutConfigs[selectedLayout] as cytoscape.LayoutOptions}
          cy={handleCy}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    </div>
  )
}
