import { AppShell } from '@mantine/core';
import { AppHeader } from './AppHeader';
import '@/styles/app/theme.scss';

interface Props {
  children: React.ReactNode;
}

const HEADER_HEIGHT = 60

export default function AppLayout({ children }: Props) {
  return (
    <AppShell
      header={{ height: HEADER_HEIGHT }}
      padding="md"
    >
      <AppShell.Header>
        <AppHeader></AppHeader>
      </AppShell.Header>
      <AppShell.Main className="flex">
        <div className="flex-1">
          {children}
        </div>
      </AppShell.Main>
    </AppShell>
  )
}
