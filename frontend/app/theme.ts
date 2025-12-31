import { createTheme } from "@mantine/core";

const theme = createTheme({
  breakpoints: {
    sm: "36em", // 576px
    md: "48em", // 768px
    lg: "64em", // 1024px
    xl: "75em", // 1200px
    xxl: "88em", // 1400px
  }
})

export default theme;
