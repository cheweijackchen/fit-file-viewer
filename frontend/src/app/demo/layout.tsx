'use client'

import { AppShell, Overlay } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Suspense } from 'react'
import { DemoHeader } from './components/DemoHeader'
import { DemoNavbar } from './components/DemoNavbar'
// import { useStore } from '../store/client/useStore'

interface DemoLayoutProps {
  children: React.ReactNode;
}

export default function DemoLayout({ children }: DemoLayoutProps) {

  const [opened, { toggle, close }] = useDisclosure()

  // const { isNavbarCollapse } = useStore()

  const smallScreen = useMediaQuery('(max-width: 48em)')

  // useEffect(() => {
  //   if (opened && smallScreen) {
  //     document.body.style.overflow = 'hidden'
  //   } else {
  //     document.body.style.overflow = 'visible'
  //   }
  // }, [opened, smallScreen])

  return (
    <AppShell
      padding="md"
      navbar={{
        // width: isNavbarCollapse ? 298 : 81,
        width: 298,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      // classNames={{
      //   navbar: classes.navbar,
      //   header: classes.header,
      //   main: classes.main,
      // }}
      header={{ height: 60 }}
    >
      <AppShell.Header>
        <DemoHeader
          opened={opened}
          toggle={toggle}
        ></DemoHeader>
        {/* <DemoHeader opened={opened} toggle={toggle} /> */}
      </AppShell.Header>
      <AppShell.Navbar
        data-smallscreen={smallScreen}
        // data-collapse={isNavbarCollapse}
      >
        <DemoNavbar />
      </AppShell.Navbar>
      <AppShell.Main>
        {opened && smallScreen && (
          <Overlay
            zIndex={100}
            h="100vh"
            color="#000"
            backgroundOpacity={0.35}
            blur={15}
            onClick={close}
          />
        )}
        <Suspense fallback={<div>Loading</div>}>{children}</Suspense>
      </AppShell.Main>
    </AppShell>
  )
}
