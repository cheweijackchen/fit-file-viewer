import { Divider, Text } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import { type MountainPeak, Taiwan100MountainPeak } from '@/constants/peaks'

interface Props {
  checkedIds: Set<string>;
}

interface CategoryGroup {
  category: string;
  peaks: {
    id: string;
    peak: MountainPeak;
  }[];
}

function groupPeaksByCategory(): CategoryGroup[] {
  const map = new Map<string, {
    id: string;
    peak: MountainPeak;
  }[]>()

  for (const [id, peak] of Object.entries(Taiwan100MountainPeak)) {
    const list = map.get(peak.category) ?? []
    list.push({
      id,
      peak,
    })
    map.set(peak.category, list)
  }

  return Array.from(map.entries()).map(([category, peaks]) => ({
    category,
    peaks,
  }))
}

const categoryGroups = groupPeaksByCategory()

export function PeaksProgressGrid({ checkedIds }: Props) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-6">
      {categoryGroups.map(group => (
        <div
          key={group.category}
          className="break-inside-avoid mb-4"
        >
          <Text
            c="dark"
            fw={700}
            size="sm"
          >
            {group.category}
          </Text>
          <Divider className="my-1" />
          <div className="flex flex-col gap-1">
            {group.peaks.map(({ id, peak }) => {
              const checked = checkedIds.has(id)
              return (
                <div
                  key={id}
                  className="flex items-center gap-1.5"
                >
                  {checked
                    ? (
                      <IconCheck
                        className="text-yellow-500 shrink-0"
                        size={14}
                      />
                    )
                    : <div className="w-3.5 shrink-0" />}
                  <div className="flex flex-1 gap-1 justify-between">
                    <Text
                      c={checked ? undefined : 'dimmed'}
                      fw={checked ? 600 : 400}
                      size="xs"
                    >
                      {peak.name}
                    </Text>
                    <Text
                      c={checked ? undefined : 'dimmed'}
                      fw={checked ? 600 : 400}
                      ff="mono"
                      size="xs"
                    >
                      {peak.elevation}m
                    </Text>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
