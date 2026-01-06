'use client'

import { Text, Flex, Group, Stack, ThemeIcon, NavLink, Box } from '@mantine/core';
import { IconChartBar, IconClipboardList, IconDeviceFloppy, IconIcons } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useDemoStore } from '@/store/demo/useDemoStore';
import { DemoNavbarSwitch } from './DemoNavbarSwitch';

interface Props {
  closeNavbar: () => void;
}

const navLinks = [
  {
    icon: IconIcons,
    title: 'Components',
    children: [
      {
        title: 'ComponentA',
        link: '/demo/demo-component-a',
      },
      {
        title: 'ComponentB',
        link: '/demo/demo-component-b',
      }
    ]
  },
  {
    icon: IconClipboardList,
    title: 'Forms',
    children: []
  },
  {
    icon: IconChartBar,
    title: 'Chart',
    children: []
  },
]

export function DemoNavbar({ closeNavbar }: Props) {
  const { isNavbarCollapse } = useDemoStore()
  const pathname = usePathname()

  return (
    <Stack className="py-5 px-4">
      <Stack
        w="100%"
        gap={18}
        align="start"
      >
        <Group
          w="100%"
          align="center"
          justify={isNavbarCollapse ? 'center' : 'space-between'}
        >
          <Flex
            align="center"
            gap={6}
          >
            <ThemeIcon
              radius="lg"
              size="lg"
            >
              <IconDeviceFloppy style={{ width: '70%', height: '70%' }} />
            </ThemeIcon>
            {!isNavbarCollapse && (
              <Text
                fw={600}
              >
                Demo
              </Text>
            )}
          </Flex>

          {!isNavbarCollapse && (<DemoNavbarSwitch />)}
        </Group>

        {isNavbarCollapse && (<DemoNavbarSwitch />)}
      </Stack>

      {!isNavbarCollapse && (
        <Stack
          w="100%"
          gap="sm"
          align={isNavbarCollapse ? 'center' : 'start'}
        >
          <Text
            fz="xs"
            fw={500}
            tt="uppercase"
          >
            {isNavbarCollapse ? 'NAV' : 'Navigation'}
          </Text>
          <Box w="100%">
            {navLinks.map(({ title, icon: NavIcon, children }) => {
              const hasActiveLink = children.some(item => item.link === pathname)

              return (
                <NavLink
                  key={title}
                  label={title}
                  leftSection={<NavIcon
                    size={16}
                    stroke={1.5}
                               />}
                  childrenOffset={28}
                  defaultOpened={hasActiveLink}
                  className="rounded-lg"
                >
                  {children?.map((entry) => {
                    return (
                      <NavLink
                        key={entry.title}
                        component={Link}
                        label={entry.title}
                        href={entry.link}
                        active={entry.link === pathname}
                        className="rounded-lg"
                        onClick={closeNavbar}
                      />
                    )
                  })}
                </NavLink>
              )
            })}
          </Box>
        </Stack>
      )}
    </Stack>
  )
}
