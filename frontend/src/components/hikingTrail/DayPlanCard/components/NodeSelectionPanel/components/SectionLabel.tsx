import clsx from 'clsx'
import type React from 'react'

interface Props {
  icon: React.ComponentType<{ size?: number; color?: string; stroke?: number; }>;
  label: string;
  muted?: boolean;
}

export function SectionLabel({ icon: Icon, label, muted }: Props) {
  const color = muted ? 'var(--mantine-color-stone-4)' : 'var(--mantine-color-stone-7)'

  return (
    <div className="flex items-center gap-1">
      <Icon
        size={12}
        color={color}
        stroke={2}
      />
      <span className={clsx('text-[11px] font-semibold tracking-[0.05em]', muted ? 'text-(--mantine-color-stone-4)' : 'text-(--mantine-color-stone-7)')}>
        {label}
      </span>
    </div>
  )
}
