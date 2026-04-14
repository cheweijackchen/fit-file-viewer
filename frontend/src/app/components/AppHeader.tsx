'use client'

import {
  Box,
  Burger,
  Button,
  Center,
  Container,
  Divider,
  Group,
  HoverCard,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown, IconFileAnalytics, IconMountain } from '@tabler/icons-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { Link } from '@/i18n/navigation'
import { useAppHeaderCta } from './AppHeaderCtaContext'
import classes from './landing/LandingHeader.module.scss'
import { LandingNavDrawer } from './landing/LandingNavDrawer'

export function AppHeader() {
  const t = useTranslations('landing')
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)
  const cta = useAppHeaderCta()

  const toolsData = [
    {
      icon: IconFileAnalytics,
      title: t('header.toolsDropdown.fitFileViewer.title'),
      description: t('header.toolsDropdown.fitFileViewer.description'),
      href: '/fit-file-viewer',
    },
    {
      icon: IconMountain,
      title: t('header.toolsDropdown.peaksTracker.title'),
      description: t('header.toolsDropdown.peaksTracker.description'),
      href: '/peaks',
    },
  ]

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
        className="h-15 w-full"
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
              <Image
                src="/logo.webp"
                alt="TrailKit"
                width={100}
                height={32}
                className="h-8 w-auto dark:invert"
              />
              <Text
                fw={700}
                size="lg"
                style={{
                  letterSpacing: -0.5,
                  color: 'var(--text-emphasis)',
                }}
              >
                {t('header.brand')}
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
                    c="bright"
                    className={classes.link}
                    onClick={e => e.preventDefault()}
                  >
                    <Center inline>
                      <Box
                        component="span"
                        mr={5}
                      >
                        {t('header.tools')}
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
                    <Text fw={500}>{t('header.toolsDropdown.title')}</Text>
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
                c="bright"
                className={classes.link}
                onClick={e => e.preventDefault()}
              >
                {t('header.about')}
              </Button>
              <Button
                component="a"
                href="#"
                variant="subtle"
                c="bright"
                className={classes.link}
                onClick={e => e.preventDefault()}
              >
                {t('header.blog')}
              </Button>
              <Button
                component="a"
                href="#"
                variant="subtle"
                c="bright"
                className={classes.link}
                onClick={e => e.preventDefault()}
              >
                {t('header.community')}
              </Button>
            </Group>

            <Group>
              <Box visibleFrom="md">
                <LanguageSwitcher />
              </Box>
              <Box visibleFrom="md">
                <ThemeSwitch />
              </Box>
              {cta}
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

      <LandingNavDrawer
        opened={drawerOpened}
        toolLinks={toolLinks}
        onClose={closeDrawer}
      />
    </>
  )
}
