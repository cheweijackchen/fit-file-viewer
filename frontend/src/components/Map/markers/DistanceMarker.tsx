import { DivIcon, type LatLngExpression } from 'leaflet';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker } from 'react-leaflet';

interface DistanceMarkerProps {
  position: LatLngExpression;
  distance: number;
  color: string;
}

// 距離標記圖標組件
const DistanceIcon: React.FC<{ distance: number; color: string; }> = ({
  distance,
  color,
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '40px',
      height: '28px',
      padding: '0 8px',
      backgroundColor: 'white',
      border: `2px solid ${color}`,
      borderRadius: '14px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '12px',
      fontWeight: '600',
      color: color,
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      whiteSpace: 'nowrap',
    }}
  >
    {distance} km
  </div>
);

export const DistanceMarker: React.FC<DistanceMarkerProps> = ({
  position,
  distance,
  color,
}) => {
  const icon = new DivIcon({
    html: renderToStaticMarkup(<DistanceIcon
      distance={distance}
      color={color}
    />),
    className: 'custom-distance-marker',
    iconSize: [40, 28],
    iconAnchor: [20, 14],
  });

  return <Marker
    position={position}
    icon={icon}
  />;
};
