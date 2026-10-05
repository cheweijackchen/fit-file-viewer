'use client'

import {
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  ScrollArea,
  SegmentedControl,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown, IconMoon, IconSun } from '@tabler/icons-react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import type { Locale } from '@/i18n/routing'
import classes from './AppHeader.module.scss'

interface Props {
  opened: boolean;
  onClose: () => void;
  toolLinks: React.ReactNode;
}

export function AppNavDrawer({ opened, onClose, toolLinks }: Props) {
  const t = useTranslations('landing')
  const [toolsOpened, { toggle: toggleTools }] = useDisclosure(false)

  const locale = useLocale() as Locale
  const router = useRouter()
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })

  function switchLocale(target: Locale) {
    localStorage.setItem('locale', target)
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=${60 * 60 * 24 * 7}`
    router.push(`/${target}`)
  }

  return (
    <Drawer.Root
      opened={opened}
      size="100%"
      hiddenFrom="md"
      zIndex={1000000}
      onClose={onClose}
    >
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>
            <Link
              href="/"
              className="flex items-center gap-2 no-underline"
              onClick={onClose}
            >
              <Image
                src="/logo.webp"
                alt="TrailKit"
                width={100}
                height={32}
                className="h-7 w-auto dark:invert"
              />
              <Text
                fw={700}
                size="md"
                style={{
                  letterSpacing: -0.5,
                  color: 'var(--text-emphasis)' 
                }}
              >
                {t('header.brand')}
              </Text>
            </Link>
          </Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <ScrollArea
            h="calc(100vh - 80px)"
            mx="-md"
          >
            <Stack
              mih="calc(100vh - 80px)"
              gap={0}
            >
              <UnstyledButton
                className={clsx(classes.link, 'max-md:w-full')}
                onClick={toggleTools}
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
              </UnstyledButton>
              <Collapse in={toolsOpened}>{toolLinks}</Collapse>

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

              <div className="mt-auto">
                <Divider my="sm" />

                <Stack
                  gap="sm"
                  px="md"
                >
                  <Stack gap={6}>
                    <Text
                      size="xs"
                      c="dimmed"
                      tt="uppercase"
                      fw={600}
                      lts={0.5}
                    >
                      {t('header.language')}
                    </Text>
                    <SegmentedControl
                      fullWidth
                      value={locale}
                      data={[
                        {
                          label: 'English',
                          value: 'en-US' 
                        },
                        {
                          label: '中文',
                          value: 'zh-TW' 
                        },
                      ]}
                      onChange={v => switchLocale(v as Locale)}
                    />
                  </Stack>

                  <Stack gap={6}>
                    <Text
                      size="xs"
                      c="dimmed"
                      tt="uppercase"
                      fw={600}
                      lts={0.5}
                    >
                      {t('header.appearance')}
                    </Text>
                    <SegmentedControl
                      fullWidth
                      value={computedColorScheme}
                      data={[
                        {
                          label: (
                            <Center>
                              <IconSun size={14} />
                              {t('header.theme.light')}
                            </Center>
                          ),
                          value: 'light',
                        },
                        {
                          label: (
                            <Center>
                              <IconMoon size={14} />
                              {t('header.theme.dark')}
                            </Center>
                          ),
                          value: 'dark',
                        },
                      ]}
                      onChange={v => setColorScheme(v as 'light' | 'dark')}
                    />
                  </Stack>
                </Stack>
              </div>
            </Stack>

            {/* <Divider mb="sm" />

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
                onClick={onClose}
              >
                {t('header.getStarted')}
              </Button>
            </Group> */}
          </ScrollArea>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  )
}
