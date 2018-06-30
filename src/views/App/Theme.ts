import styled, {ThemedReactEmotionInterface} from "react-emotion"
import {withTheme} from "emotion-theming"
import {createSelector} from "reselect"

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

const diff = 0.02

const breakpointsMap = {
  xs: {
    max: 576 - diff,
  },
  sm: {
    min: 576,
    max: 768 - diff,
  },
  md: {
    min: 768,
    max: 992 - diff,
  },
  lg: {
    min: 992,
    max: 1200 - diff,
  },
  xl: {
    min: 1200,
  },
}

type breakpointName = keyof typeof breakpointsMap
const minBreakpointName: breakpointName = "xs"
const maxBreakpointName: breakpointName = "xl"

type topBreakpointName = Exclude<breakpointName, typeof minBreakpointName>

const breakpointUp = (size: topBreakpointName) =>
  `(min-width: ${breakpointsMap[size].min}px)`

type bottomBreakpointName = Exclude<breakpointName, typeof maxBreakpointName>

const breakpointDown = (size: bottomBreakpointName) =>
  `(max-width: ${breakpointsMap[size].max}px)`

const media = (breakpoint: string) => `@media ${breakpoint}`

export const mediaBreakpointUp = (size: topBreakpointName) =>
  media(breakpointUp(size))

export const mediaBreakpointDown = (size: bottomBreakpointName) =>
  media(breakpointDown(size))

type Theme = typeof theme

export interface ThemeProps {
  theme: Theme
}

const customStyled = styled as ThemedReactEmotionInterface<Theme>

export {customStyled as styled}

const customWithTheme = <P extends object>(
  WrappedComponent: React.ComponentType<P & ThemeProps>
): React.ComponentType<P> => withTheme(WrappedComponent)

export {customWithTheme as withTheme}

export const JS_HREF = "javascript:void(0);"
