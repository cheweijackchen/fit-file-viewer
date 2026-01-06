import { Text, Flex, Group, Stack, ThemeIcon } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useDemoStore } from '@/store/demo/useDemoStore';
import { DemoNavbarSwitch } from './DemoNavbarSwitch';

export function DemoNavbar() {
  const { isNavbarCollapse } = useDemoStore()

  return (
    <Stack className="py-5 px-4">
      <Flex
        w="100%"
        gap={18}
        direction="column"
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
      </Flex>
    </Stack>
  )
}
