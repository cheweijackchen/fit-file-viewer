'use client'

import {
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Container,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown, IconFileAnalytics, IconMountain } from '@tabler/icons-react'
import clsx from 'clsx'
import Link from 'next/link'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import classes from './LandingHeader.module.scss'

const toolsData = [
  {
    icon: IconFileAnalytics,
    title: 'FIT File Viewer',
    description: 'Analyze your Garmin FIT files in the browser',
    href: '/fit-file-viewer',
  },
  {
    icon: IconMountain,
    title: 'Peaks Tracker',
    description: 'Track and visualize your peak bagging progress',
    href: '/peaks',
  },
]

export function LandingHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)
  const [toolsOpened, { toggle: toggleTools }] = useDisclosure(false)

  const toolLinks = toolsData.map(item => (
    <UnstyledButton
      key={item.title}
      className={classes.subLink}
      component={Link}
      href={item.href}
    >
      <Group
        wrap="nowrap"
        align="flex-start"
      >
        <ThemeIcon
          size={34}
          variant="default"
          radius="md"
        >
          <item.icon
            size={22}
            color="var(--mantine-color-yellow-5)"
          />
        </ThemeIcon>
        <div>
          <Text
            size="sm"
            fw={500}
          >
            {item.title}
          </Text>
          <Text
            size="xs"
            c="dimmed"
          >
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ))

  return (
    <>
      <header
        className="sticky top-0 z-50 h-15"
        style={{
          backgroundColor: 'var(--mantine-color-body)',
          borderBottom: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
        }}
      >
        <Container
          size="xl"
          h="100%"
        >
          <Group
            justify="space-between"
            h="100%"
          >
            <Link
              href="/"
              className="flex items-center gap-2.5 no-underline"
            >
              <IconMountain
                size={28}
                stroke={1.5}
                color="var(--mantine-color-yellow-5)"
              />
              <Text
                fw={700}
                size="lg"
                style={{
                  letterSpacing: -0.5,
                  color: 'var(--text-emphasis)',
                }}
              >
                TrailKit
              </Text>
            </Link>

            <Group
              h="100%"
              gap={0}
              visibleFrom="md"
            >
              <HoverCard
                withinPortal
                width={600}
                radius="md"
                shadow="md"
                position="bottom"
              >
                <HoverCard.Target>
                  <Button
                    component="a"
                    href="#"
                    variant="subtle"
                    c="dark.6"
                    className={classes.link}
                    onClick={e => e.preventDefault()}
                  >
                    <Center inline>
                      <Box
                        component="span"
                        mr={5}
                      >
                        Tools
                      </Box>
                      <IconChevronDown
                        size={16}
                        color="var(--mantine-color-yellow-5)"
                      />
                    </Center>
                  </Button>
                </HoverCard.Target>

                <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                  <Group
                    justify="space-between"
                    px="md"
                  >
                    <Text fw={500}>Tools</Text>
                  </Group>

                  <Divider my="sm" />

                  <SimpleGrid
                    cols={2}
                    spacing={0}
                  >
                    {toolLinks}
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>

              <Button
                component="a"
                href="#"
                variant="subtle"
                c="dark.6"
                className={classes.link}
                onClick={e => e.preventDefault()}
              >
                About
              </Button>
              <Button
                component="a"
                href="#"
                variant="subtle"
                c="dark.6"
                className={classes.link}
                onClick={e => e.preventDefault()}
              >
                Blog
              </Button>
              <Button
                component="a"
                href="#"
                variant="subtle"
                c="dark.6"
                className={classes.link}
                onClick={e => e.preventDefault()}
              >
                Community
              </Button>
            </Group>

            <Group>
              <ThemeSwitch />
              <Button
                component={Link}
                href="/fit-file-viewer"
                color="yellow"
                radius="xl"
                size="sm"
                visibleFrom="md"
              >
                Get Started
              </Button>
              <Burger
                hiddenFrom="md"
                aria-label="Toggle navigation"
                opened={drawerOpened}
                onClick={toggleDrawer}
              />
            </Group>
          </Group>
        </Container>
      </header>

      <Drawer
        opened={drawerOpened}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="md"
        zIndex={1000000}
        onClose={closeDrawer}
      >
        <ScrollArea
          h="calc(100vh - 80px)"
          mx="-md"
        >
          <Divider mb="sm" />

          <UnstyledButton
            className={clsx(classes.link, 'max-md:w-full')}
            onClick={toggleTools}
          >
            <Center inline>
              <Box
                component="span"
                mr={5}
              >
                Tools
              </Box>
              <IconChevronDown
                size={16}
                color="var(--mantine-color-yellow-5)"
              />
            </Center>
          </UnstyledButton>
          <Collapse in={toolsOpened}>{toolLinks}</Collapse>

          <Button
            component="a"
            href="#"
            variant="subtle"
            c="dark.6"
            className={classes.link}
            onClick={e => e.preventDefault()}
          >
            About
          </Button>
          <Button
            component="a"
            href="#"
            variant="subtle"
            c="dark.6"
            className={classes.link}
            onClick={e => e.preventDefault()}
          >
            Blog
          </Button>
          <Button
            component="a"
            href="#"
            variant="subtle"
            c="dark.6"
            className={classes.link}
            onClick={e => e.preventDefault()}
          >
            Community
          </Button>

          <Divider my="sm" />

          <Group
            grow
            justify="center"
            pb="xl"
            px="md"
          >
            <Button
              component={Link}
              href="/fit-file-viewer"
              color="yellow"
              radius="xl"
              onClick={closeDrawer}
            >
              Get Started
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  )
}
