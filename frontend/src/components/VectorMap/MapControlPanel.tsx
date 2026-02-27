interface Props {
  children: React.ReactNode;
}

export function MapControlPanel({ children }: Props) {
  return (
    <div className="absolute top-42.5 right-2.5 flex flex-col gap-2.5 pointer-events-auto">
      {children}
    </div>
  )
}
