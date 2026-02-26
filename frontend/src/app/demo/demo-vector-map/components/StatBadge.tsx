interface Props {
  label: string;
  value: string;
}

export function StatBadge({ label, value }: Props) {
  return (
    <div className="flex flex-col gap-0.5">
      <span
        style={{
          fontSize: 9,
          color: 'var(--color-text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 13,
          color: 'var(--color-text-primary)',
          fontWeight: 600,
        }}
      >
        {value}
      </span>
    </div>
  )
}
