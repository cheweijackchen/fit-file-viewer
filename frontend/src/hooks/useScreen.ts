import { useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export default function useScreen() {
  const theme = useMantineTheme()
  const onMobile = useMediaQuery(`(max-width: calc(${theme.breakpoints.md} - 1px))`)
  const onDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`)

  return {
    onMobile,
    onDesktop
  }
}
