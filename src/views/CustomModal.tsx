import React, {SFC} from "react"
import {Modal, ModalProps} from "reactstrap"
import {css, cx} from "../../node_modules/emotion"
import {lighten} from "../../node_modules/polished"
import {theme} from "./App/emotion"

const customModalStyles = css`
  background: ${theme.blue};
  color: white;
  padding: 1.5rem;
  border-radius: 1.5rem;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.125em;
  label {
    color: ${lighten(0.2, theme.lightGrey)};
  }
  .miniLabel {
    color: ${lighten(0.2, theme.lightGrey)};
    font-size: 0.8rem;
    text-align: center;
  }
  input {
    border-radius: 1.5rem;
  }
  button,
  a {
    border-radius: 1.5rem;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 0.125em;
  }
`

const CustomModal: SFC<ModalProps> = ({contentClassName, ...restOfProps}) => (
  <Modal
    contentClassName={cx(customModalStyles, contentClassName)}
    {...restOfProps}
  />
)

export default CustomModal
