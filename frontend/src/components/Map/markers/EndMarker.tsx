import { DivIcon, type LatLngExpression } from 'leaflet';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet';

interface EndMarkerProps {
  position: LatLngExpression;
  color: string;
  trackName?: string;
}

// 終點圖標組件
const EndIcon: React.FC<{ color: string; }> = ({ color }) => (
  <div
    style={{
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}
  >
    {/* 旗幟桿 */}
    <div
      style={{
        position: 'absolute',
        width: '2px',
        height: '36px',
        backgroundColor: color,
        left: '8px',
        bottom: '0',
      }}
    />
    {/* 旗幟 */}
    <svg
      width="24"
      height="20"
      viewBox="0 0 24 20"
      style={{
        position: 'absolute',
        left: '10px',
        top: '2px',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
      }}
    >
      <path
        d="M0 0 L18 0 L14 10 L18 20 L0 20 Z"
        fill={color}
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
    {/* 基座圓圈 */}
    <div
      style={{
        position: 'absolute',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: color,
        border: '2px solid white',
        bottom: '0',
        left: '6px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
      }}
    />
  </div>
);

export const EndMarker: React.FC<EndMarkerProps> = ({
  position,
  color,
  trackName,
}) => {
  const icon = new DivIcon({
    html: renderToStaticMarkup(<EndIcon color={color} />),
    className: 'custom-marker-icon',
    iconSize: [36, 36],
    iconAnchor: [8, 36],
  });

  return (
    <Marker
      position={position}
      icon={icon}
    >
      <Popup>
        <div style={{ fontFamily: 'system-ui, sans-serif' }}>
          <strong>終點</strong>
          {trackName && (
            <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '4px' }}>
              {trackName}
            </div>
          )}
        </div>
      </Popup>
    </Marker>
  );
};
