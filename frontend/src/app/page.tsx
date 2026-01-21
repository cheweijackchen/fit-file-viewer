'use client'

import { Center, Container } from '@mantine/core';
import { FitFileUploader } from '@/components/FitFileUploader';
import { useFitDataStoreBase } from '@/store/app/useFitDataStore';
import AppLayout from './components/AppLayout';
import { HomeBanner } from './components/HomeBanner';
import { SummarySection } from './components/SummarySection'

export default function Home() {
  const hasFitData = useFitDataStoreBase(state => !!state.fitData)
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
                <SummarySection></SummarySection>
              </div>
              <div className="lg:col-span-7 2xl:col-span-6"></div>
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
