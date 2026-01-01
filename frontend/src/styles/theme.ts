import { createTheme } from "@mantine/core";

const theme = createTheme({
  breakpoints: {
    sm: "36em", // 576px
    md: "48em", // 768px
    lg: "64em", // 1024px
    xl: "80em", // 1280px
    "2xl": "96em", // 1536px
  }
})

export default theme;
