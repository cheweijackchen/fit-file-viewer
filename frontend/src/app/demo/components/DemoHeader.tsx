import {
  Burger,
  Flex,
  Group,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
// import FullScreen from "../components/FullScreen"
// import ThemeSwitch from "../components/ThemeSwitch"
// import { useStore } from "../store/client/useStore"

interface Props {
  opened: boolean;
  toggle: () => void;
}


export function DemoHeader ({ opened, toggle }: Props) {
  const smallScreen = useMediaQuery('(max-width: 48em)')

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
        {smallScreen ? (
          <Burger
            opened={opened}
            hiddenFrom="sm"
            size="sm"
            onClick={toggle}
          />
        ) : (
          <Burger
            style={{ outline: 'none', }}
            size="sm"
            // opened={!isNavbarCollapse}
            // onClick={toggleNavbar}
          />
        )}
      </Flex>
    </Group>
  )
}
