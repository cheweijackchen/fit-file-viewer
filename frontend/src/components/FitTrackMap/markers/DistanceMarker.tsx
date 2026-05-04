import { DivIcon, type LatLngExpression } from 'leaflet'
import type { FC } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Marker } from 'react-leaflet'

interface DistanceMarkerProps {
  position: LatLngExpression;
  distance: number;
  color: string;
}

const DistanceIcon: FC<{ distance: number; color: string; }> = ({
  distance,
  color,
}) => (
  <div
    className="flex items-center justify-center bg-white whitespace-nowrap px-1 py-0.5 text-xs font-semibold leading-[normal]"
    style={{
      border: `2px solid ${color}`,
      color: color
    }}
  >
    {distance}
  </div>
)


export function DistanceMarker({ position, distance, color }: DistanceMarkerProps) {
  const icon = new DivIcon({
    html: renderToStaticMarkup(
      <DistanceIcon
        distance={distance}
        color={color}
      />
    ),
    className: 'custom-distance-marker',
    iconSize: [36, 24],
    iconAnchor: [18, 12],
  })

  return (
    <Marker
      position={position}
      icon={icon}
    />
  )
}
