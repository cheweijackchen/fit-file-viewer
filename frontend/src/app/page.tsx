'use client'

import { Center } from '@mantine/core';
import { FitFileUploader } from '@/components/FitFileUploader';
import { useFitDataStore } from '@/store/app/useFitDataStore';
import AppLayout from './components/AppLayout';

export default function Home() {
  const fitData = useFitDataStore(state => state.fitData)
  return (
    <AppLayout >
      {!fitData && (
        <Center className="h-full">
          <FitFileUploader></FitFileUploader>
        </Center>
      )}
    </AppLayout>
  )
}
