export function formatTrailMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  if (h === 0) {
    return `${m}m` 
  }
  if (m === 0) {
    return `${h}h` 
  }
  return `${h}h ${m}m`
}

export function formatElapsedTime(milliseconds: number, showSeconds = true) {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const hh = String(hours).padStart(2, '0')
  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')

  return showSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`
}
