'use client'

import { Center, Container, Stack, useMantineTheme } from '@mantine/core';
import { FitFileUploader } from '@/components/FitFileUploader';
import { HeartRateZoneCard } from '@/components/HeartRateZoneCard';
import FitTrackMap from '@/components/Map/FitTrackMap';
import { RecordsCard } from '@/components/RecordsCard'
import { useFitDataStore } from '@/store/app/useFitDataStore';
import AppLayout from './components/AppLayout';
import { HomeBanner } from './components/HomeBanner';
import { SummarySection } from './components/SummarySection'

export default function Home() {
  const theme = useMantineTheme()

  const fitData = useFitDataStore.use.fitData()
  const hasFitData = !!fitData

  return (
    <AppLayout >
      {hasFitData
        ? (
          <Container
            size="xxl"
            className="py-4"
            px={24}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-7 2xl:col-span-6">
                <Stack gap="md">
                  <SummarySection></SummarySection>
                  <HeartRateZoneCard fitData={fitData}></HeartRateZoneCard>
                </Stack>
              </div>
              <div className="lg:col-span-5 2xl:col-span-6">
                <FitTrackMap
                  className="z-0 h-125 lg:h-full"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  tracks={{ id: 'the-only-track', ...fitData } as any}
                  trackColors={[theme.colors.red[6]]}
                  showZoomControls={true}
                  showStartMarker={true}
                  showEndMarker={true}
                  showDistanceMarkers={true}
                />
              </div>
              <div className="lg:col-span-12">
                <RecordsCard records={fitData.records ?? []}></RecordsCard>
              </div>
            </div>
          </Container>
        )
        : (
          <>
            <HomeBanner className="pt-20 px-6 pb-12"></HomeBanner>
            <Center className="pt-6 pb-20 px-6">
              <FitFileUploader className="w-full md:w-4/5"></FitFileUploader>
            </Center>
          </>
        )}
    </AppLayout>
  )
}
