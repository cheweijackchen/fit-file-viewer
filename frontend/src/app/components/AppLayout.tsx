import { AppShell, Divider } from '@mantine/core'
import { AppFooter } from './AppFooter'
import { AppHeader } from './AppHeader'
import '@/styles/app/theme.scss'

interface Props {
  children: React.ReactNode;
}

const HEADER_HEIGHT = 60

export default function AppLayout({ children }: Props) {
  return (
    <AppShell
      header={{ height: HEADER_HEIGHT }}
    >
      <AppShell.Header
        withBorder={false}
      >
        <AppHeader></AppHeader>
      </AppShell.Header>
      <AppShell.Main className="flex">
        <div className="flex-1">
          {children}
        </div>
      </AppShell.Main>
      <Divider className="px-6"></Divider>
      <AppFooter className="px-6 py-8"></AppFooter>
    </AppShell>
  )
}
