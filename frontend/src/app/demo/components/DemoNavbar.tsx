'use client'

import { Text, Flex, Group, Stack, ThemeIcon, NavLink, Box } from '@mantine/core'
import { IconDeviceFloppy } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useScreen from '@/hooks/useScreen'
import { useDemoStore } from '@/store/demo/useDemoStore'
import { DemoNavbarSwitch } from './DemoNavbarSwitch'
import { demoNavLinks } from '../demoRoutes'

interface Props {
  closeNavbar: () => void;
}

export function DemoNavbar({ closeNavbar }: Props) {
  const { isNavbarCollapse } = useDemoStore()
  const { onMobile } = useScreen()
  const pathname = usePathname()

  const isNavbarShown = !isNavbarCollapse || onMobile

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
          justify={isNavbarShown ? 'space-between' : 'center'}
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
            {isNavbarShown && (
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

      {isNavbarShown && (
        <Stack
          w="100%"
          gap="sm"
          align={isNavbarShown ? 'start' : 'center'}
        >
          <Text
            fz="xs"
            fw={500}
            tt="uppercase"
          >
            Navigation
          </Text>
          <Box w="100%">
            {demoNavLinks.map(({ title, icon: NavIcon, children }) => {
              const hasActiveLink = children.some(item => item.link === pathname)

              return (
                <NavLink
                  key={title}
                  label={title}
                  leftSection={
                    <NavIcon
                      size={16}
                      stroke={1.5}
                    />
                  }
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
