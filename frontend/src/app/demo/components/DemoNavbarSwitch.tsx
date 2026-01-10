'use client'

import { rem, Switch } from '@mantine/core';
import { useDemoStore } from '@/store/demo/useDemoStore';

export function DemoNavbarSwitch() {
  const {
    isNavbarCollapse,
    toggleNavbar
  } = useDemoStore()

  return (
    <Switch
      defaultChecked
      checked={!isNavbarCollapse}
      visibleFrom="md"
      styles={{
        root: {
          height: '100%',
        },
        body: {
          height: '100%',
        },
        track: {
          cursor: 'pointer',
          height: '100%',
          minWidth: rem(26),
          width: rem(20),
        },
        thumb: {
          '--switch-track-label-padding': '-1px',
          height: '90%',
          width: rem(12),
          borderRadius: rem(3),
          insetInlineStart: 'var(--switch-thumb-start, 1px)',
        },
      }}
      h={22}
      radius={4}
      onChange={toggleNavbar}
    />
  )
}
