import {styled} from "./App/Theme"

const Button = styled("button")(({theme}) => ({
  color: "white",
  display: "block",
  backgroundColor: theme.lightGreen,
  background: `linear-gradient(
    ${theme.lightGreen},
    ${theme.lightGreen} 50%,
    ${theme.darkGreen} 50%,
    ${theme.darkGreen}
  )`,
  borderRadius: "2.25rem / 2rem",
  border: "none",
  letterSpacing: "1px",
  fontWeight: 700,
  padding: "0.5rem 1.5rem",
  textTransform: "uppercase",
  width: "100%",
}))

export default Button
