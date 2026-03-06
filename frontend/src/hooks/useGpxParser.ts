import { parseGPX } from '@we-gold/gpxjs'
import { useState, useCallback } from 'react'
import { computeTrackStats } from '@/lib/elevationUtils'
import type { ParsedTrack, TrackPoint, Waypoint } from '@/model/gpx'

type ParseState =
  | { status: 'idle'; }
  | { status: 'parsing'; }
  | { status: 'success'; track: ParsedTrack; }
  | { status: 'error'; message: string; }

interface UseGpxParserReturn {
  state: ParseState;
  parseFile: (file: File) => void;
  reset: () => void;
}

export function useGpxParser(): UseGpxParserReturn {
  const [state, setState] = useState<ParseState>({ status: 'idle' })

  const parseFile = useCallback((file: File) => {
    if (!file.name.toLowerCase().endsWith('.gpx')) {
      setState({ status: 'error', message: '請上傳 .gpx 格式的檔案' })
      return
    }

    setState({ status: 'parsing' })

    const reader = new FileReader()

    reader.onload = (event) => {
      const text = event.target?.result
      if (typeof text !== 'string') {
        setState({ status: 'error', message: '無法讀取檔案內容' })
        return
      }

      try {
        const [gpx, error] = parseGPX(text)

        if (error || !gpx) {
          setState({
            status: 'error',
            message: error?.message ?? 'GPX 解析失敗',
          })
          return
        }

        // Collect all track points from all tracks.
        // @we-gold/gpxjs: track.points is a flat array of point objects,
        // each with { lat, lon, elevation, time }.
        const points: TrackPoint[] = []

        for (const track of gpx.tracks) {
          for (const pt of track.points) {
            points.push({
              lat: pt.latitude,
              lon: pt.longitude,
              elevation: pt.elevation ?? null,
              time: pt.time ? new Date(pt.time) : null,
            })
          }
        }

        // Collect named waypoints (POIs separate from the track)
        const parsedWaypoints: Waypoint[] = gpx.waypoints.map((wp) => ({
          lat: wp.latitude,
          lon: wp.longitude,
          elevation: wp.elevation ?? null,
          name: wp.name,
          description: wp.description ?? wp.comment,
          symbol: wp.symbol,
          time: wp.time,
        }))

        // Fallback: use waypoints as track when there are no track points.
        // In this case they are already the track, so don't show them again
        // as separate waypoint markers.
        let separateWaypoints = parsedWaypoints
        if (points.length === 0 && gpx.waypoints.length > 0) {
          for (const wp of gpx.waypoints) {
            points.push({
              lat: wp.latitude,
              lon: wp.longitude,
              elevation: wp.elevation ?? null,
              time: wp.time ? new Date(wp.time) : null,
            })
          }
          separateWaypoints = []
        }

        if (points.length === 0) {
          setState({
            status: 'error',
            message: 'GPX 檔案中沒有軌跡點資料',
          })
          return
        }

        const stats = computeTrackStats(points)
        const name =
          gpx.tracks[0]?.name ?? file.name.replace(/\.gpx$/i, '')

        setState({
          status: 'success',
          track: { name, points, waypoints: separateWaypoints, stats },
        })
      } catch (err) {
        setState({
          status: 'error',
          message: err instanceof Error ? err.message : 'GPX 解析失敗',
        })
      }
    }

    reader.onerror = () => {
      setState({ status: 'error', message: '檔案讀取失敗' })
    }

    reader.readAsText(file)
  }, [])

  const reset = useCallback(() => {
    setState({ status: 'idle' })
  }, [])

  return { state, parseFile, reset }
}
