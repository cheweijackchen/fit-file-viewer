'use client'

import { AppShell } from '@mantine/core'

interface Props {
  children: React.ReactNode
}

export default function PeaksShell({ children }: Props) {
  return (
    <AppShell>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}
