import { DivIcon, type LatLngExpression } from 'leaflet'
import { type FC } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Marker, Popup } from 'react-leaflet'

interface StartMarkerProps {
  position: LatLngExpression;
  color: string;
  trackName?: string;
  showTooltip?: boolean;
}

const StartIcon: FC<{ color: string; }> = ({ color }) => (
  <div
    className="relative w-8 h-8 flex items-center justify-center"
  >
    {/* outer circle */}
    <div
      className="absolute w-8 h-8 rounded-2xl opacity-30"
      style={{
        backgroundColor: color,
        animation: 'pulse 2s ease-in-out infinite',
      }}
    />
    {/* inner circle */}
    <div
      className="absolute w-5 h-5 rounded-xl border-3 border-white shadow-md"
      style={{ backgroundColor: color }}
    />
    {/* play icon */}
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      style={{ position: 'relative', zIndex: 1, marginLeft: '2px' }}
    >
      <path
        d="M2 1 L2 9 L8 5 Z"
        fill="white"
      />
    </svg>

    <style>
      {
        `@keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.1;
          }
        }`
      }
    </style>
  </div>
)

export function StartMarker({
  position,
  color,
  trackName,
  showTooltip
}: StartMarkerProps) {
  const icon = new DivIcon({
    html: renderToStaticMarkup(<StartIcon color={color} />),
    className: 'custom-marker-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  return (
    <Marker
      position={position}
      icon={icon}
    >
      {showTooltip && <Popup>
        <div>
          <strong>Origin</strong>
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
