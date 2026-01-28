import { DivIcon, type LatLngExpression } from 'leaflet';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet';

interface StartMarkerProps {
  position: LatLngExpression;
  color: string;
  trackName?: string;
}

// 起點圖標組件
const StartIcon: React.FC<{ color: string; }> = ({ color }) => (
  <div
    style={{
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}
  >
    {/* 外圈 */}
    <div
      style={{
        position: 'absolute',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: color,
        opacity: 0.3,
        animation: 'pulse 2s ease-in-out infinite',
      }}
    />
    {/* 內圈 */}
    <div
      style={{
        position: 'absolute',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: color,
        border: '3px solid white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
    />
    {/* 播放圖標 */}
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

    <style>{`
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          opacity: 0.3;
        }
        50% {
          transform: scale(1.2);
          opacity: 0.1;
        }
      }
    `}</style>
  </div>
);

export const StartMarker: React.FC<StartMarkerProps> = ({
  position,
  color,
  trackName,
}) => {
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
      <Popup>
        <div style={{ fontFamily: 'system-ui, sans-serif' }}>
          <strong>起點</strong>
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
