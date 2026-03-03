import maplibregl, { type Map } from 'maplibre-gl'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { calculateDistance } from '@/lib/geoUtils'
import type { TrackPoint } from '@/model/gpx'

interface PlaybackPoint {
  lon: number;
  lat: number;
  elapsed: number; // seconds from activity start
}

export interface UseTrackPlaybackResult {
  isPlaying: boolean;
  progress: number;               // 0–1
  currentTime: number;            // seconds from start
  totalDuration: number;          // seconds (0 if < 2 points)
  speed: number;                  // 1 | 2 | 4 | 8
  currentPosition: [number, number] | null; // [lon, lat]
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seek: (progress: number) => void;
  setSpeed: (s: number) => void;
}

interface UseTrackPlaybackOptions {
  map: Map | null;
  points: TrackPoint[];
  enabled: boolean;
  terrain?: boolean;
}

const FALLBACK_SPEED_MPS = 3    // m/s assumed when no timestamps
const OUT_AND_BACK_RATIO = 0.15 // end-to-start dist < 15% of total path → out-and-back
const UI_UPDATE_INTERVAL = 100  // ms between React state updates
const CAMERA_EASE_MS = 200     // map.easeTo duration per frame
const PLAYBACK_PITCH = 50      // degrees
const PLAYBACK_ZOOM = 15.5
const PLAYBACK_ZOOM_TERRAIN = 14.5  // zoom out when 3-D terrain is active

// Logarithmic playback target: T = K × ln(distanceKm + 1)
// Calibration: ~10 km → 28 s | ~50 km → 47 s | ~100 km → 55 s | ~200 km → 64 s
const LOG_PLAYBACK_K = 25.0
const MIN_PLAYBACK_SECONDS = 20

function calcBearing(from: [number, number], to: [number, number]): number {
  const toRad = (d: number) => (d * Math.PI) / 180
  const lon1 = toRad(from[0])
  const lat1 = toRad(from[1])
  const lon2 = toRad(to[0])
  const lat2 = toRad(to[1])
  const dLon = lon2 - lon1
  const y = Math.sin(dLon) * Math.cos(lat2)
  const x = (Math.cos(lat1) * Math.sin(lat2)) - (Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon))
  return ((((Math.atan2(y, x) * 180) / Math.PI) + 360) % 360)
}

function lerpBearing(start: number, end: number, t: number): number {
  let diff = end - start
  if (diff > 180) {
    diff -= 360
  }
  if (diff < -180) {
    diff += 360
  }
  return (start + (diff * t) + 360) % 360
}


function interpolate(points: PlaybackPoint[], virtualTime: number): [number, number] {
  if (points.length === 0) {
    return [0, 0]
  }
  if (virtualTime <= points[0].elapsed) {
    return [points[0].lon, points[0].lat]
  }
  const last = points[points.length - 1]
  if (virtualTime >= last.elapsed) {
    return [last.lon, last.lat]
  }

  // Binary search for segment
  let lo = 0
  let hi = points.length - 1
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1
    if (points[mid].elapsed <= virtualTime) {
      lo = mid
    } else {
      hi = mid
    }
  }

  const a = points[lo]
  const b = points[hi]
  const seg = b.elapsed - a.elapsed
  if (seg <= 0) {
    return [a.lon, a.lat]
  }
  const t = (virtualTime - a.elapsed) / seg
  return [a.lon + ((b.lon - a.lon) * t), a.lat + ((b.lat - a.lat) * t)]
}

function normalizePoints(points: TrackPoint[]): PlaybackPoint[] {
  if (points.length < 2) {
    return []
  }

  const firstWithTime = points.find(p => p.time !== null)
  if (firstWithTime?.time) {
    const origin = firstWithTime.time.getTime()
    const result: PlaybackPoint[] = []
    for (const p of points) {
      if (p.time === null) {
        continue
      }
      result.push({ lon: p.lon, lat: p.lat, elapsed: (p.time.getTime() - origin) / 1000 })
    }
    return result.length >= 2 ? result : []
  }

  // Fallback: distribute by cumulative distance at assumed speed
  const result: PlaybackPoint[] = [{ lon: points[0].lon, lat: points[0].lat, elapsed: 0 }]
  let elapsed = 0
  for (let i = 1; i < points.length; i++) {
    const distKm = calculateDistance(points[i - 1].lat, points[i - 1].lon, points[i].lat, points[i].lon)
    elapsed += ((distKm * 1000) / FALLBACK_SPEED_MPS)
    result.push({ lon: points[i].lon, lat: points[i].lat, elapsed })
  }
  return result
}

interface PlaybackBearings {
  start: number;
  end: number;
}

function calcTargetPlaybackSeconds(totalDistanceKm: number): number {
  if (totalDistanceKm <= 0) {
    return MIN_PLAYBACK_SECONDS
  }
  return Math.max(MIN_PLAYBACK_SECONDS, LOG_PLAYBACK_K * Math.log(totalDistanceKm + 1))
}

function calcPlaybackBearings(points: PlaybackPoint[]): PlaybackBearings {
  if (points.length < 2) {
    return { start: 0, end: 0 }
  }
  const first = points[0]
  const last = points[points.length - 1]

  let totalLength = 0
  for (let i = 1; i < points.length; i++) {
    totalLength += calculateDistance(points[i - 1].lat, points[i - 1].lon, points[i].lat, points[i].lon)
  }

  const directDist = calculateDistance(first.lat, first.lon, last.lat, last.lon)
  let apexPoint: PlaybackPoint = last
  if (totalLength > 0 && (directDist / totalLength) < OUT_AND_BACK_RATIO) {
    let maxDist = 0
    for (const p of points) {
      const d = calculateDistance(first.lat, first.lon, p.lat, p.lon)
      if (d > maxDist) {
        maxDist = d
        apexPoint = p
      }
    }
  }

  const startBearing = calcBearing([first.lon, first.lat], [apexPoint.lon, apexPoint.lat])
  return { start: startBearing, end: (startBearing + 180) % 360 }
}

export function useTrackPlayback({ map, points, enabled, terrain }: UseTrackPlaybackOptions): UseTrackPlaybackResult {
  const playbackPoints = useMemo(() => normalizePoints(points), [points])
  const playbackBearings = useMemo(() => calcPlaybackBearings(playbackPoints), [playbackPoints])
  const totalDuration = playbackPoints.length > 0 ? playbackPoints[playbackPoints.length - 1].elapsed : 0
  const totalDistanceKm = useMemo(() => {
    let dist = 0
    for (let i = 1; i < playbackPoints.length; i++) {
      dist += calculateDistance(
        playbackPoints[i - 1].lat,
        playbackPoints[i - 1].lon,
        playbackPoints[i].lat,
        playbackPoints[i].lon,
      )
    }
    return dist
  }, [playbackPoints])
  const baseSpeed = totalDuration > 0 ? totalDuration / calcTargetPlaybackSeconds(totalDistanceKm) : 1

  // UI state (triggers re-renders for the PlaybackBar)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [speed, setSpeedState] = useState(1)
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null)

  // Refs — mutated during animation without causing re-renders
  const rafIdRef = useRef<number | null>(null)
  const playStartRealRef = useRef(0)   // performance.now() when play/resume started
  const seekOffsetRef = useRef(0)      // virtual seconds at start of current segment
  const bearingRef = useRef(0)         // current smoothed bearing
  const lastUiRef = useRef(0)          // timestamp of last React state flush
  const speedRef = useRef(1)           // mirrors speed state for use inside rAF
  const baseSpeedRef = useRef(baseSpeed) // auto-computed multiplier to hit target playback duration
  const isPlayingRef = useRef(false)   // mirrors isPlaying for use inside callbacks
  const playbackPointsRef = useRef(playbackPoints)
  const totalDurationRef = useRef(totalDuration)
  const mapRef = useRef(map)
  const playbackBearingsRef = useRef(playbackBearings)
  const terrainRef = useRef(terrain ?? false)

  // Sync all mutable refs after each render (useLayoutEffect runs before paint)
  useLayoutEffect(() => {
    speedRef.current = speed
    baseSpeedRef.current = baseSpeed
    isPlayingRef.current = isPlaying
    playbackPointsRef.current = playbackPoints
    totalDurationRef.current = totalDuration
    mapRef.current = map
    playbackBearingsRef.current = playbackBearings
    terrainRef.current = terrain ?? false
  })

  // The animation tick — stored in a ref so it can call itself recursively.
  // Uses only refs and stable setState functions, so it never needs to be recreated.
  const animateFnRef = useRef<(ts: number) => void>(() => { })

  useEffect(() => {
    animateFnRef.current = (timestamp: number) => {
      const m = mapRef.current
      const pts = playbackPointsRef.current
      const dur = totalDurationRef.current
      if (!m || pts.length === 0) {
        return
      }

      const realElapsed = timestamp - playStartRealRef.current
      const virtualTime = seekOffsetRef.current + ((realElapsed * baseSpeedRef.current * speedRef.current) / 1000)

      if (virtualTime >= dur) {
        rafIdRef.current = null
        setIsPlaying(false)
        isPlayingRef.current = false
        seekOffsetRef.current = dur
        setProgress(1)
        setCurrentTime(dur)
        setCurrentPosition(interpolate(pts, dur))
        return
      }

      const pos = interpolate(pts, virtualTime)
      bearingRef.current = lerpBearing(
        playbackBearingsRef.current.start,
        playbackBearingsRef.current.end,
        virtualTime / dur,
      )

      const elevation = m.queryTerrainElevation(pos) ?? 0
      m.easeTo({
        center: pos,
        elevation,
        bearing: bearingRef.current,
        pitch: PLAYBACK_PITCH,
        zoom: terrainRef.current ? PLAYBACK_ZOOM_TERRAIN : PLAYBACK_ZOOM,
        duration: CAMERA_EASE_MS,
        easing: t => t,
      })

      if (timestamp - lastUiRef.current >= UI_UPDATE_INTERVAL) {
        setProgress(virtualTime / dur)
        setCurrentTime(virtualTime)
        setCurrentPosition([pos[0], pos[1]])
        lastUiRef.current = timestamp
      }

      rafIdRef.current = requestAnimationFrame(ts => animateFnRef.current(ts))
    }
  }, []) // stable — all values read from refs

  function cancelRaf() {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }

  function play() {
    if (!mapRef.current || playbackPointsRef.current.length === 0 || totalDurationRef.current === 0) {
      return
    }
    if (seekOffsetRef.current >= totalDurationRef.current) {
      seekOffsetRef.current = 0
    }
    playStartRealRef.current = performance.now()
    cancelRaf()
    setIsPlaying(true)
    isPlayingRef.current = true
    rafIdRef.current = requestAnimationFrame(ts => animateFnRef.current(ts))
  }

  function pause() {
    const realElapsed = performance.now() - playStartRealRef.current
    seekOffsetRef.current = Math.min(
      seekOffsetRef.current + ((realElapsed * baseSpeedRef.current * speedRef.current) / 1000),
      totalDurationRef.current,
    )
    cancelRaf()
    setIsPlaying(false)
    isPlayingRef.current = false
  }

  function toggle() {
    if (isPlayingRef.current) {
      pause()
    } else {
      play()
    }
  }

  function seek(p: number) {
    const clamped = Math.max(0, Math.min(1, p))
    const virtualTime = clamped * totalDurationRef.current
    seekOffsetRef.current = virtualTime
    playStartRealRef.current = performance.now()
    setProgress(clamped)
    setCurrentTime(virtualTime)
    const pos = interpolate(playbackPointsRef.current, virtualTime)
    setCurrentPosition([pos[0], pos[1]])

    bearingRef.current = lerpBearing(
      playbackBearingsRef.current.start,
      playbackBearingsRef.current.end,
      clamped,
    )

    if (isPlayingRef.current) {
      cancelRaf()
      rafIdRef.current = requestAnimationFrame(ts => animateFnRef.current(ts))
    } else {
      const elevation = mapRef.current?.queryTerrainElevation(pos) ?? 0
      mapRef.current?.easeTo({
        center: pos,
        elevation,
        bearing: bearingRef.current,
        pitch: PLAYBACK_PITCH,
        zoom: terrainRef.current ? PLAYBACK_ZOOM_TERRAIN : PLAYBACK_ZOOM,
        duration: 400,
      })
    }
  }

  function setSpeed(s: number) {
    if (isPlayingRef.current) {
      const realElapsed = performance.now() - playStartRealRef.current
      seekOffsetRef.current = Math.min(
        seekOffsetRef.current + ((realElapsed * baseSpeedRef.current * speedRef.current) / 1000),
        totalDurationRef.current,
      )
      playStartRealRef.current = performance.now()
    }
    setSpeedState(s)
  }

  // Reset animation state whenever the track changes
  useEffect(() => {
    cancelRaf()
    isPlayingRef.current = false
    seekOffsetRef.current = 0
    bearingRef.current = playbackBearingsRef.current.start
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime(0)
    setCurrentPosition(null)
  }, [playbackPoints])

  // Cancel RAF on unmount regardless of playback state
  useEffect(() => cancelRaf, [])

  // Restore overview and reset state when playback is disabled
  // No cleanup return here — if enabled transitions false → true, the RAF
  // started by play() must not be cancelled by an effect cleanup
  useEffect(() => {
    if (!enabled) {
      cancelRaf()
      isPlayingRef.current = false
      seekOffsetRef.current = 0
      bearingRef.current = playbackBearingsRef.current.start
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPlaying(false)
      setProgress(0)
      setCurrentTime(0)
      setCurrentPosition(null)
      if (map && points.length > 0) {
        const bounds = new maplibregl.LngLatBounds()
        for (const p of points) {
          bounds.extend([p.lon, p.lat])
        }
        map.fitBounds(bounds, { padding: 80, pitch: 50, duration: 1200 })
      }
    }
  }, [enabled, map, points])

  return { isPlaying, progress, currentTime, totalDuration, speed, currentPosition, play, pause, toggle, seek, setSpeed }
}
