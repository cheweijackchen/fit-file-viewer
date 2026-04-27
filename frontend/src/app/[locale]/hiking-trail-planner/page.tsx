'use client'

import { Box, Button, Group, Stack, Text } from '@mantine/core'
import {
  IconCalendar,
  IconGitFork,
  IconMap,
  IconPlus,
  IconRoute,
} from '@tabler/icons-react'
import { TripCard } from '@/components/hikingTrail/TripCard'
import type { HikingPlan } from '@/model/hikingTrail'

const MOCK_PLANS: HikingPlan[] = [
  {
    id: '1',
    name: '南二段規劃',
    trailIds: ['south-second-section'],
    paceMultiplier: 1.0,
    days: [{
      id: 'd1',
      badges: [],
      stops: [] 
    }, {
      id: 'd2',
      badges: [],
      stops: [] 
    }, {
      id: 'd3',
      badges: [],
      stops: [] 
    }],
    createdAt: Date.now() - (7 * 24 * 60 * 60 * 1000),
    updatedAt: Date.now() - (2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    name: '北一段縱走',
    trailIds: ['north-first-section'],
    paceMultiplier: 1.1,
    days: [{
      id: 'd1',
      badges: [],
      stops: []
    }, {
      id: 'd2',
      badges: [],
      stops: []
    }, {
      id: 'd3',
      badges: [],
      stops: []
    }, {
      id: 'd4',
      badges: [],
      stops: []
    }],
    createdAt: Date.now() - (14 * 24 * 60 * 60 * 1000),
    updatedAt: Date.now() - (5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    name: '玉山群峰探索',
    trailIds: ['yushan-group'],
    paceMultiplier: 0.9,
    days: [{
      id: 'd1',
      badges: [],
      stops: []
    }, {
      id: 'd2',
      badges: [],
      stops: []
    }],
    createdAt: Date.now() - (3 * 24 * 60 * 60 * 1000),
    updatedAt: Date.now() - (60 * 60 * 1000),
  },
]

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: <IconGitFork size={20} />,
    title: 'Visual Trail Graph',
    description: 'See every node and connection before you plan',
  },
  {
    icon: <IconCalendar size={20} />,
    title: 'Multi-Day Planning',
    description: 'Organize your itinerary day by day with time estimates',
  },
  {
    icon: <IconRoute size={20} />,
    title: 'Connected Routes',
    description: 'Combine multiple trails into one seamless journey',
  },
]

export default function HikingTrailPlannerPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section
        className="flex flex-col items-center w-full"
        style={{
          background: 'var(--mantine-color-stone-1)',
          padding: '80px 40px',
          gap: 24,
        }}
      >
        <Text
          fw={700}
          ta="center"
          style={{
            fontSize: 40,
            color: 'var(--mantine-color-stone-9)',
            maxWidth: 700 
          }}
        >
          Plan Your Mountain Journey
        </Text>

        <Text
          ta="center"
          style={{
            fontSize: 16,
            color: 'var(--mantine-color-stone-7)',
            lineHeight: 1.6,
            maxWidth: 560,
          }}
        >
          Map your multi-day alpine routes, visualize trail connections,
          and plan each day step by step.
        </Text>

        <Button
          color="yellow"
          leftSection={<IconMap size={18} />}
          radius={10}
          fw={600}
        >
          Start New Trip
        </Button>

        <Group
          gap={32}
          align="flex-start"
          mt={8}
        >
          {FEATURES.map((f) => (
            <Stack
              key={f.title}
              gap={8}
              align="center"
              style={{ width: 180 }}
            >
              <Box
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: 'var(--mantine-color-stone-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--mantine-color-stone-7)',
                }}
              >
                {f.icon}
              </Box>
              <Text
                fw={600}
                ta="center"
                style={{
                  fontSize: 13,
                  color: 'var(--mantine-color-stone-9)' 
                }}
              >
                {f.title}
              </Text>
              <Text
                ta="center"
                style={{
                  fontSize: 12,
                  color: 'var(--mantine-color-stone-6)',
                  lineHeight: 1.5 
                }}
              >
                {f.description}
              </Text>
            </Stack>
          ))}
        </Group>
      </section>

      {/* Your Trips */}
      <section
        className="flex flex-col w-full"
        style={{
          background: 'var(--mantine-color-stone-2)',
          padding: '48px 80px',
          gap: 24,
        }}
      >
        <Group
          justify="space-between"
          align="center"
        >
          <Text
            fw={700}
            style={{
              fontSize: 20,
              color: 'var(--mantine-color-stone-9)' 
            }}
          >
            Your Trips
          </Text>
          <Button
            color="yellow"
            size="sm"
            radius={8}
            leftSection={<IconPlus size={14} />}
            fw={600}
          >
            New Trip
          </Button>
        </Group>

        <Group
          gap={20}
          align="stretch"
          style={{ width: '100%' }}
        >
          {MOCK_PLANS.map((plan) => (
            <Box
              key={plan.id}
              style={{
                flex: 1,
                minWidth: 0 
              }}
            >
              <TripCard plan={plan} />
            </Box>
          ))}
        </Group>
      </section>
    </div>
  )
}
