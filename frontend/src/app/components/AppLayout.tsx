import { AppShell, Container } from '@mantine/core';
import { AppHeader } from './AppHeader';

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
        <Container className="flex-1">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
