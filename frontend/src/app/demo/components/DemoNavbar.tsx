'use client'

import { Text, Flex, Group, Stack, ThemeIcon, NavLink, Box } from '@mantine/core';
import { IconChartBar, IconClipboardList, IconDeviceFloppy, IconIcons } from '@tabler/icons-react';
import { useDemoStore } from '@/store/demo/useDemoStore';
import { DemoNavbarSwitch } from './DemoNavbarSwitch';
import Link from 'next/link';

const navLinks = [
  {
    icon: IconIcons,
    title: "Components",
    children: [
      {
        title: "ComponentA",
        link: "/demo/demo-component-a",
      },
      {
        title: "ComponentB",
        link: "/demo/demo-component-b",
      }
    ]
  },
  {
    icon: IconClipboardList,
    title: "Forms",
    children: []
  },
  {
    icon: IconChartBar,
    title: "Chart",
    children: []
  },
]

export function DemoNavbar() {
  const { isNavbarCollapse } = useDemoStore()

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
          align={isNavbarCollapse ? "center" : "start"}
        >
          <Text fz="xs" fw={500} tt="uppercase">
            {isNavbarCollapse ? "NAV" : "Navigation"}
          </Text>
          <Box w="100%">
            {navLinks.map(({ title, icon: NavIcon, children }) => {
              return (
                <NavLink
                  key={title}
                  label={title}
                  leftSection={<NavIcon size={16} stroke={1.5} />}
                  childrenOffset={28}
                >
                  {children?.map((entry) => {
                    return (
                      <NavLink
                        component={Link}
                        key={entry.title}
                        label={entry.title}
                        href={entry.link} />
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
