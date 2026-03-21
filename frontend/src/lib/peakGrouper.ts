import { MountainCategory, Taiwan100MountainPeak, type MountainPeak } from '@/constants/peaks'

export interface PeakEntry {
  id: string;
  peak: MountainPeak;
}

export interface PeakGroup {
  category: string;
  peaks: PeakEntry[];
}

function groupPeaksByCategory(): PeakGroup[] {
  const categoryOrder = Object.values(MountainCategory)
  const groupMap = new Map<string, PeakEntry[]>()

  for (const category of categoryOrder) {
    groupMap.set(category, [])
  }

  for (const [id, peak] of Object.entries(Taiwan100MountainPeak)) {
    const entries = groupMap.get(peak.category)
    if (entries) {
      entries.push({ id, peak })
    }
  }

  for (const entries of groupMap.values()) {
    entries.sort((a, b) => a.peak.rank - b.peak.rank)
  }

  return categoryOrder
    .map((category) => ({
      category,
      peaks: groupMap.get(category) ?? [],
    }))
    .filter((group) => group.peaks.length > 0)
}

export const peakGroups: PeakGroup[] = groupPeaksByCategory()

export const TOTAL_PEAKS = Object.keys(Taiwan100MountainPeak).length
