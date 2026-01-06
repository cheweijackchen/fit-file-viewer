'use client'

import { AppShell, ScrollArea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DemoHeader } from './components/DemoHeader'
import { DemoNavbar } from './components/DemoNavbar'
import classes from './DemoLayout.module.scss'
import { useDemoStore } from '@/store/demo/useDemoStore'

interface DemoLayoutProps {
  children: React.ReactNode;
}

const NAVBAR_WIDTH = 260
const NAVBAR_COLLAPSED_WIDTH = 60
const HEADER_HEIGHT = 60

export default function DemoLayout({ children }: DemoLayoutProps) {

  const [opened, { toggle }] = useDisclosure()

  const { isNavbarCollapse } = useDemoStore()

  return (
    <AppShell
      layout="alt"
      header={{ height: HEADER_HEIGHT }}
      navbar={{
        width: isNavbarCollapse ? NAVBAR_COLLAPSED_WIDTH : NAVBAR_WIDTH,
        breakpoint: 'md',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      classNames={{
        navbar: classes.navbar,
      }}
    >
      <AppShell.Header>
        <DemoHeader
          opened={opened}
          toggle={toggle}
        ></DemoHeader>
      </AppShell.Header>
      <AppShell.Navbar
        data-collapse={isNavbarCollapse}
      >
        <AppShell.Section
          grow
          component={ScrollArea}
        >
          <DemoNavbar />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}
