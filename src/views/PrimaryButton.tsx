import {styled} from "./App/emotion"
import {Link} from "react-router-dom"
import {darken, desaturate, shade} from "polished"

export const PrimaryButton = styled("button")(({theme}) => ({
  background: `linear-gradient(
    ${theme.lightGreen},
    ${theme.lightGreen} 50%,
    ${theme.darkGreen} 50%,
    ${theme.darkGreen}
  )`,
  backgroundColor: theme.lightGreen,
  border: "none",
  borderRadius: "2.25rem / 2rem",
  color: "white",
  display: "block",
  fontWeight: 700,
  letterSpacing: "1px",
  padding: "0.5rem 1.5rem",
  textAlign: "center",
  textDecoration: "none",
  textTransform: "uppercase",

  "&:disabled, &[disabled]": {
    color: darken(0.25, "white"),
  },

  "&:enabled, &:not([disabled])": {
    "&:hover, &:focus": {
      color: "white",
      textDecoration: "none",
      background: `linear-gradient(
      ${darken(0.05, theme.lightGreen)},
      ${darken(0.05, theme.lightGreen)} 50%,
      ${darken(0.05, theme.darkGreen)} 50%,
      ${darken(0.05, theme.darkGreen)}
    )`,
    },

    "&:active": {
      background: `linear-gradient(
      ${darken(0.1, theme.lightGreen)},
      ${darken(0.1, theme.lightGreen)} 50%,
      ${darken(0.1, theme.darkGreen)} 50%,
      ${darken(0.1, theme.darkGreen)}
    )`,
    },
  },
}))

export const PrimaryButtonAsLink = PrimaryButton.withComponent(Link)
