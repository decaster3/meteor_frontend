import React from "react"
import {Link as ReactRouterLink} from "react-router-dom"
import {compose} from "redux"
import withCart, {CartProps} from "../../containers/Cart"
import withGeolocation, {GeolocationProps} from "../../containers/Geolocation"
import {UserProps, withUser} from "../../containers/UserSession"
import {styled, theme} from "../App/emotion"

type SettingsProps = UserProps & CartProps & GeolocationProps

const Link = styled(ReactRouterLink)`
  color: ${theme.orange};
  text-decoration: none;
  :focus,
  :hover,
  :active {
    color: ${theme.redOrange};
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
  withUser
)(Settings)
