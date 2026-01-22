import { Box, Stack, Text } from '@mantine/core'
import { IconMoodSad } from '@tabler/icons-react'
import classes from './EmptyState.module.scss'

export function EmptyState() {
  return (
    <Stack
      p="md"
      gap="md"
      align="center"
      className={classes['empty-state']}
    >

      <Box
        p={4}
      >
        <IconMoodSad
          size={36}
          strokeWidth={1.5}
        />
      </Box>
      <Text>No data found</Text>
    </Stack>
  )
}
