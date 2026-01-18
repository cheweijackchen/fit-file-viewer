import { Flex, Text } from '@mantine/core';

interface Props {
  className: string;
}

export function AppFooter({ className }: Props) {
  return (
    <Flex className={className}>
      <Text
        c="dimmed"
        size="sm"
      >
        © 2026 cheweijackchen. All rights reserved.
      </Text>
      {/* <Group gap={0}  justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandGithub size={18} stroke={1.5} />
          </ActionIcon>
        </Group> */}
    </Flex>
  )
}
