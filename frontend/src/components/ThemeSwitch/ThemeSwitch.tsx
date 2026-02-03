'use client'

import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'
import cx from 'clsx'
import classes from './ThemeSwitch.module.scss'

export function ThemeSwitch() {

  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })

  return (
    <ActionIcon
      variant="default"
      size="input-sm"
      aria-label="Toggle color scheme"
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
    >
      <IconSun
        className={cx(classes.icon, classes.light)}
        stroke={1.5}
      />
      <IconMoon
        className={cx(classes.icon, classes.dark)}
        stroke={1.5}
      />
    </ActionIcon>
  )
}
