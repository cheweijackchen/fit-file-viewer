'use client'

import { AppShell } from '@mantine/core'
import { AppHeader } from '@/app/components/AppHeader'
import { HEADER_HEIGHT } from '@/constants/layout'

interface Props {
  children: React.ReactNode;
}

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
