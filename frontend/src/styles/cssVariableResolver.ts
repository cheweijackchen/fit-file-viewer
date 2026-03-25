import type { CSSVariablesResolver } from '@mantine/core'

export const mantineCssVariableResolver: CSSVariablesResolver = () => ({
  variables: {
    //  variables that do not depend on color scheme
  },
  light: {
    '--text-emphasis': '#1A1A1A',
    '--text-secondary': '#5A5A5A',
    '--text-subtitle': '#8C8C8C',
    '--text-muted': '#B0B0B0',
  },
  dark: {
    '--text-emphasis': '#F0F0F0',
    '--text-secondary': '#A8A8A8',
    '--text-subtitle': '#7A7A7A',
    '--text-muted': '#5A5A5A',
  },
})
