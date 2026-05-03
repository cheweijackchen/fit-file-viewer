import { DivIcon, type LatLngExpression } from 'leaflet'
import { type FC } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Marker, Popup } from 'react-leaflet'

interface EndMarkerProps {
  position: LatLngExpression;
  color: string;
  trackName?: string;
  showTooltip?: boolean;
}

const EndIcon: FC<{ color: string; }> = ({ color }) => (
  <div
    className="relative w-9 h-9 flex items-center justify-center"
  >
    {/* pole */}
    <div
      className="absolute w-0.5 h-9 left-2 bottom-0"
      style={{ backgroundColor: color }}
    />
    {/* flag */}
    <svg
      width="24"
      height="20"
      viewBox="0 0 24 20"
      className="absolute left-2.5 top-0.5"
      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
    >
      <path
        d="M0 0 L18 0 L14 10 L18 20 L0 20 Z"
        fill={color}
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
    {/* base dot */}
    <div
      className="absolute w-2 h-2 rounded-sm border-2 border-white bottom-0 left-1.5 shadow-md"
      style={{ backgroundColor: color }}
    />
  </div>
)

export function EndMarker({
  position,
  color,
  trackName,
  showTooltip
}: EndMarkerProps) {
  const icon = new DivIcon({
    html: renderToStaticMarkup(<EndIcon color={color} />),
    className: 'custom-marker-icon',
    iconSize: [36, 36],
    iconAnchor: [8, 36],
  })

  return (
    <Marker
      position={position}
      icon={icon}
    >
      {showTooltip && <Popup>
        <div>
          <strong>終點</strong>
          {trackName && (
            <div className="text-sm mt-1">
              {trackName}
            </div>
          )}
        </div>
      </Popup>}
    </Marker>
  )
}
