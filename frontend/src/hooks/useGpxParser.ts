import { parseGPX } from '@we-gold/gpxjs'
import { useState, useCallback } from 'react'
import { computeTrackStats } from '@/lib/elevationUtils'
import type { ParsedTrack, TrackPoint, Waypoint } from '@/model/gpx'

export const GPX_PARSE_STATUS = {
  IDLE: 'idle',
  PARSING: 'parsing',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

type ParseState =
  | { status: typeof GPX_PARSE_STATUS.IDLE; }
  | { status: typeof GPX_PARSE_STATUS.PARSING; }
  | { status: typeof GPX_PARSE_STATUS.SUCCESS; track: ParsedTrack; }
  | { status: typeof GPX_PARSE_STATUS.ERROR; message: string; }

interface UseGpxParserReturn {
  state: ParseState;
  parseFile: (file: File) => void;
  reset: () => void;
}

export function useGpxParser(): UseGpxParserReturn {
  const [state, setState] = useState<ParseState>({ status: GPX_PARSE_STATUS.IDLE })

  const parseFile = useCallback((file: File) => {
    if (!file.name.toLowerCase().endsWith('.gpx')) {
      setState({
        status: GPX_PARSE_STATUS.ERROR,
        message: '請上傳 .gpx 格式的檔案',
      })
      return
    }

    setState({ status: GPX_PARSE_STATUS.PARSING })

    const reader = new FileReader()

    reader.onload = (event) => {
      const text = event.target?.result
      if (typeof text !== 'string') {
        setState({
          status: GPX_PARSE_STATUS.ERROR,
          message: '無法讀取檔案內容',
        })
        return
      }

      try {
        const [gpx, error] = parseGPX(text)

        if (error || !gpx) {
          setState({
            status: GPX_PARSE_STATUS.ERROR,
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
            status: GPX_PARSE_STATUS.ERROR,
            message: 'GPX 檔案中沒有軌跡點資料',
          })
          return
        }

        const stats = computeTrackStats(points)
        const name =
          gpx.tracks[0]?.name ?? file.name.replace(/\.gpx$/i, '')

        setState({
          status: GPX_PARSE_STATUS.SUCCESS,
          track: {
            name,
            points,
            waypoints: separateWaypoints,
            stats,
          },
        })
      } catch (err) {
        setState({
          status: GPX_PARSE_STATUS.ERROR,
          message: err instanceof Error ? err.message : 'GPX 解析失敗',
        })
      }
    }

    reader.onerror = () => {
      setState({
        status: GPX_PARSE_STATUS.ERROR,
        message: '檔案讀取失敗',
      })
    }

    reader.readAsText(file)
  }, [])

  const reset = useCallback(() => {
    setState({ status: GPX_PARSE_STATUS.IDLE })
  }, [])

  return {
    state,
    parseFile,
    reset,
  }
}
