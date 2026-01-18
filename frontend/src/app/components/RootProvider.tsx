'use client'
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { mantineCssVariableResolver } from '@/styles/cssVariableResolver';
import theme from '@/styles/theme';

export function RootProvider({ children }: { children: React.ReactNode; }) {
  return (
    <MantineProvider
      theme={theme}
      cssVariablesResolver={mantineCssVariableResolver}
    >
      {children}
      <Notifications />
    </MantineProvider>
  )
}
