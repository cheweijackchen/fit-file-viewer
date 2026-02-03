import { ActionIcon } from '@mantine/core'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { useMap } from 'react-leaflet'

export function ZoomControls() {
  const map = useMap()

  const handleZoomIn = () => {
    map.zoomIn()
  }

  const handleZoomOut = () => {
    map.zoomOut()
  }

  return (
    <div
      className="absolute top-2 right-2 z-1000 flex flex-col gap-1"
    >
      <ActionIcon
        size="input-sm"
        variant="default"
        aria-label="zoom in"
        onClick={handleZoomIn}
      >
        <IconPlus size={24} />
      </ActionIcon>
      <ActionIcon
        size="input-sm"
        variant="default"
        aria-label="zoom out"
        onClick={handleZoomOut}
      >
        <IconMinus size={24} />
      </ActionIcon>
    </div>
  )
}
