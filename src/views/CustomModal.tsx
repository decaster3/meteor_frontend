import React, {SFC} from "react"
import {Modal, ModalProps} from "reactstrap"
import {cx, css} from "../../node_modules/emotion"
import {ThemeProps, withTheme} from "./App/emotion"
import {lighten} from "../../node_modules/polished"

const CustomModal: SFC<ModalProps & ThemeProps> = ({
  contentClassName,
  theme,
  ...restOfProps
}) => (
  <Modal
    contentClassName={cx(
      css`
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
      `,
      contentClassName
    )}
    {...restOfProps}
  />
)

export default withTheme(CustomModal)
