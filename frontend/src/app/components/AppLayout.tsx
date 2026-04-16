'use client'

import { AppShell } from '@mantine/core'
import { AppFooter } from './AppFooter'
import { AppHeader } from './AppHeader'

interface Props {
  children: React.ReactNode;
}

const HEADER_HEIGHT = 60

export default function AppLayout({ children }: Props) {
  return (
    <AppShell
      header={{ height: HEADER_HEIGHT }}
    >
      <AppShell.Header withBorder={false}>
        <AppHeader />
      </AppShell.Header>
      <AppShell.Main className="flex">
        <div className="flex-1">
          {children}
        </div>
      </AppShell.Main>
      <AppFooter />
    </AppShell>
  )
}
