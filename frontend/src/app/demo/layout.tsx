'use client'

import { AppShell, ScrollArea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useDemoStore } from '@/store/demo/useDemoStore'
import { DemoHeader } from './components/DemoHeader'
import { DemoNavbar } from './components/DemoNavbar'
import classes from './DemoLayout.module.scss'

interface DemoLayoutProps {
  children: React.ReactNode;
}

const NAVBAR_WIDTH = 260
const NAVBAR_COLLAPSED_WIDTH = 60
const HEADER_HEIGHT = 60

export default function DemoLayout({ children }: DemoLayoutProps) {

  const [
    navbarOpened, {
      toggle: toggleNavbar,
      close: closeNavbar
    }
  ] = useDisclosure()

  const { isNavbarCollapse } = useDemoStore()

  return (
    <AppShell
      layout="alt"
      header={{ height: HEADER_HEIGHT }}
      navbar={{
        width: isNavbarCollapse ? NAVBAR_COLLAPSED_WIDTH : NAVBAR_WIDTH,
        breakpoint: 'md',
        collapsed: { mobile: !navbarOpened },
      }}
      padding="md"
      classNames={{
        navbar: classes.navbar,
      }}
    >
      <AppShell.Header>
        <DemoHeader
          opened={navbarOpened}
          toggle={toggleNavbar}
        ></DemoHeader>
      </AppShell.Header>
      <AppShell.Navbar
        data-collapse={isNavbarCollapse}
      >
        <AppShell.Section
          grow
          component={ScrollArea}
        >
          <DemoNavbar closeNavbar={closeNavbar} />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}
