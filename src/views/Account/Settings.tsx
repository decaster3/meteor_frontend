import React from "react"
import {compose} from "redux"
import {withUser, UserProps} from "../../containers/UserSession"
import withCart, {CartProps} from "../../containers/Cart"
import {
  paymentMethodTranslation,
  orderStatusTranslation,
} from "../../containers/UserSession/actions"
import {Status} from "../../constants"
import {Link as ReactRouterLink} from "react-router-dom"
import {ThemeProps, styled, withTheme} from "../App/emotion"
import Order from "./Order"
import withGeolocation, {GeolocationProps} from "../../containers/Geolocation"

interface SettingsProps
  extends UserProps,
    CartProps,
    ThemeProps,
    GeolocationProps {}

const Link = styled(ReactRouterLink)`
  color: ${props => props.theme.orange};
  text-decoration: none;
  :focus,
  :hover,
  :active {
    color: ${props => props.theme.redOrange};
    text-decoration: none;
  }
`

class Settings extends React.Component<SettingsProps> {
  render() {
    return (
      <div>
        <div className={"bg-darkblue"}>
          <div className={"row align-items-center my-3 p-3"}>
            <div className="col">Выйти из аккаунта</div>
            <div className="col-auto">
              <button
                className="btn btn-outline-danger"
                onClick={() => this.props.logout()}
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  withGeolocation,
  withCart,
  withUser,
  withTheme
)(Settings)
