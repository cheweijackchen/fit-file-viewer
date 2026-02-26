interface Props {
  children: React.ReactNode;
}

export function MapControlPanel({ children }: Props) {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2 pointer-events-auto">
      {children}
    </div>
  )
}
