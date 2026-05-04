'use client'

import { AppShell } from '@mantine/core'
import { AppHeader } from '@/app/components/AppHeader'

interface Props {
  children: React.ReactNode;
}

const HEADER_HEIGHT = 60

export function MapShellLayout({ children }: Props) {
  return (
    <AppShell
      header={{ height: HEADER_HEIGHT }}
      padding={0}
    >
      <AppShell.Header withBorder={false}>
        <AppHeader />
      </AppShell.Header>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}
