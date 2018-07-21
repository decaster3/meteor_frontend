import * as styledComponents from "styled-components"

export const theme = {
  darkGrey: "hsl(199, 20%, 16%)",
  grey: "hsl(200, 23%, 24%)",
  lightGrey: "hsl(199, 28%, 32%)",
  lighterGrey: "hsl(199, 28%, 57%)",
  lightestGrey: "hsl(199, 28%, 77%)",

  darkBlue: "hsl(232, 60%, 5%)",
  blue: "hsl(226, 54%, 13%)",
  lightBlue: "hsl(226, 54%, 38%)",

  yellow: "hsl(49, 95%, 55%)",
  orange: "hsl(33, 99%, 50%)",
  redOrange: "hsl(10, 73%, 52%)",

  lightGreen: "hsl(78, 69%, 35%)",
  darkGreen: "hsl(91, 71%, 27%)",
}

export type Theme = typeof theme

export interface ThemeProps {
  theme: Theme
}

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
  withTheme,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<Theme>

export {css, injectGlobal, keyframes, ThemeProvider, withTheme}
export default styled
