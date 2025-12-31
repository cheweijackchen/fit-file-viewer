const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-mantine": {},
    'postcss-simple-vars': {
      variables: {
        // Define variables for your breakpoints,
        // values should be the same as in your theme
        'mantine-breakpoint-sm': '36em',
        'mantine-breakpoint-md': '48em',
        'mantine-breakpoint-lg': '64em',
        'mantine-breakpoint-xl': '75em',
        'mantine-breakpoint-xxl': '88em'
      }
    }
  }
}

export default config
