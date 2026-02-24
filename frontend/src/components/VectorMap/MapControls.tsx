import type { Map } from 'maplibre-gl'

interface MapControlsProps {
  map: Map | null;
  onReset: () => void;
}

/**
 * Custom floating controls rendered outside the MapLibre DOM.
 * Provides a "重置視角" (reset view) button that snaps pitch/bearing back.
 */
export function MapControls({ onReset }: MapControlsProps) {
  return (
    <div className="absolute bottom-8 right-4 flex flex-col gap-2 z-10">
      <button
        title="重置視角"
        className="
          px-3 py-2 text-xs font-mono rounded
          bg-[var(--color-surface)] border border-[var(--color-border)]
          text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
          hover:border-[var(--color-accent)] transition-colors duration-150
          cursor-pointer
        "
        onClick={onReset}
      >
        ↺ 重置視角
      </button>
    </div>
  )
}
