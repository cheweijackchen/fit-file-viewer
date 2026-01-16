'use client'

import { Center, Container } from '@mantine/core';
import { FitFileUploader } from '@/components/FitFileUploader';
import { useFitDataStoreBase } from '@/store/app/useFitDataStore';
import AppLayout from './components/AppLayout';
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
          <Center className="h-full p-4">
            <FitFileUploader></FitFileUploader>
          </Center>
        )}
    </AppLayout>
  )
}
