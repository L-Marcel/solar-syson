import { extendTheme } from "@chakra-ui/react";
import colors from "./colors.json";

const theme = extendTheme({
  colors,
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  styles: {
    global: {
      ":root": {
        "--primary": colors.primary[500],
        "--primary-500": colors.primary[500],
        "--primary-400": colors.primary[400],
        "--primary-300": colors.primary[300],
        "--white": colors.white,
        "--gray": colors.gray
      },
      span: {
        color: colors.primary[500],
      },
      "*": {
        userSelect: "none",
        transition: "filter .2s linear !important",
      },
      "::-webkit-scrollbar": {
        w: 2,
        mr: -2
      },
      "::-webkit-scrollbar-track": {
        background: colors.primary[50]
      },
      "::-webkit-scrollbar-thumb": {
        background: colors.primary[600],
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: colors.primary[500],
      },
      img: {
        userDrag: "none",
        pointerEvents: "none"
      },
      body: {
        bg: colors.background,
        h: "100vh",
        w: "100vw",
        overflow: "hidden"
      },
      "input": {
        borderColor: colors.primary[600],
        color: colors.primary[600]
      },
      "button:hover": {
        filter: "brightness(0.95)"
      },
      "*:focus": {
        boxShadow: "none !important"
      },
      "input:focus": {
        borderColor: `${colors.primary[500]} !important`,
        boxShadow: "none !important"
      },
      ".chakra-checkbox__control:not([data-checked])": {
        color: "var(--primary) !important",
        bgColor: "primary.100"
      },
      "li.chakra-toast + li": {
        ".container": {
          mt: 0
        }
      }
    }
  }
});

export default theme;