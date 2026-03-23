import { ActionIcon, Tooltip } from '@mantine/core'
import { IconCamera } from '@tabler/icons-react'
import type { Map } from 'maplibre-gl'
import { useCallback } from 'react'

interface Props {
  map: Map | null;
  isMapReady: boolean;
}

function downloadCanvasAsImage(canvas: HTMLCanvasElement): void {
  const url = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.download = 'contour-map.png'
  link.href = url
  link.click()
}

export function CaptureMapButton({ map, isMapReady }: Props) {
  const handleCapture = useCallback(() => {
    if (!map) {
      return
    }

    // Use render callback to capture the canvas while the buffer is still available
    map.once('render', () => {
      downloadCanvasAsImage(map.getCanvas())
    })
    map.triggerRepaint()
  }, [map])

  return (
    <Tooltip
      label="Capture map as image"
      position="left"
      withinPortal={false}
      openDelay={750}
    >
      <ActionIcon
        size="lg"
        variant="default"
        aria-label="Capture map as image"
        disabled={!isMapReady}
        onClick={handleCapture}
      >
        <IconCamera size={20} />
      </ActionIcon>
    </Tooltip>
  )
}
