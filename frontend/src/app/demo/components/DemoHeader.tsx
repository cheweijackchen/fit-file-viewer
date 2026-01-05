'use client'

import {
  Burger,
  Flex,
  Group,
} from '@mantine/core'
// import ThemeSwitch from "../components/ThemeSwitch"

interface Props {
  opened: boolean;
  toggle: () => void;
}

export function DemoHeader({ opened, toggle }: Props) {
  return (
    <Group
      h="100%"
      px="lg"
      justify="space-between"
    >
      <Flex
        align="center"
        gap={16}
      >
        <Burger
          opened={opened}
          hiddenFrom="md"
          size="sm"
          onClick={toggle}
        />
      </Flex>
    </Group>
  )
}
