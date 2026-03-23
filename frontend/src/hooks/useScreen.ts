import { useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export default function useScreen() {
  const theme = useMantineTheme()
  const onVerticalMobile = useMediaQuery(`(max-width: calc(${theme.breakpoints.sm} - 1px))`)
  const onMobile = useMediaQuery(`(max-width: calc(${theme.breakpoints.md} - 1px))`)
  const onDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`)

  return {
    onMobile,
    onVerticalMobile,
    onDesktop
  }
}
