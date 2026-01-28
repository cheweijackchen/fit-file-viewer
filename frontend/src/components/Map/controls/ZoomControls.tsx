import React from 'react';
import { useMap } from 'react-leaflet';

export const ZoomControls: React.FC = () => {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const buttonStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    backgroundColor: 'white',
    border: '2px solid rgba(0,0,0,0.2)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    transition: 'all 0.2s ease',
    userSelect: 'none',
  };

  const hoverStyle: React.CSSProperties = {
    backgroundColor: '#f5f5f5',
    borderColor: 'rgba(0,0,0,0.3)',
    transform: 'scale(1.05)',
  };

  const [zoomInHover, setZoomInHover] = React.useState(false);
  const [zoomOutHover, setZoomOutHover] = React.useState(false);

  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <button
        style={{
          ...buttonStyle,
          ...(zoomInHover ? hoverStyle : {}),
        }}
        aria-label="Zoom in"
        onClick={handleZoomIn}
        onMouseEnter={() => setZoomInHover(true)}
        onMouseLeave={() => setZoomInHover(false)}
      >
        +
      </button>
      <button
        style={{
          ...buttonStyle,
          ...(zoomOutHover ? hoverStyle : {}),
        }}
        aria-label="Zoom out"
        onClick={handleZoomOut}
        onMouseEnter={() => setZoomOutHover(true)}
        onMouseLeave={() => setZoomOutHover(false)}
      >
        −
      </button>
    </div>
  );
};
