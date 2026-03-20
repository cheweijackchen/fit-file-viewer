'use client'

import { AppShell } from '@mantine/core'

export default function PeaksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}
