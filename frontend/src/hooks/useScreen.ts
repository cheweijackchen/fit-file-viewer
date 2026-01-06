import { useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export default function useScreen() {
  const theme = useMantineTheme()
  const onMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`)
  const onDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`)

  return {
    onMobile,
    onDesktop
  }
}
