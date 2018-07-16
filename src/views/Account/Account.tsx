import React from "react"
import {compose} from "redux"
import {
  withUser,
  UserDispatchProps,
  UserStateProps,
} from "../../containers/UserSession"
import AccountMeteorHistory from "./AccountMeteorHistory"
import AccountOrderHistory from "./AccountOrderHistory"
import {cx, css} from "emotion"
import {ThemeProps} from "../App/Theme"
import {withTheme} from "../../../node_modules/emotion-theming"

interface AccountWrapperProps
  extends UserStateProps,
    UserDispatchProps,
    ThemeProps {}

class AccountWrapper extends React.Component<AccountWrapperProps> {
  componentDidMount() {
    this.props.getUserInfo()
  }

  render() {
    return (
      <div>
        <div>
          <div
            className={cx(
              "row align-items-center my-5",
              css`
                color: ${this.props.theme.lighterGrey};
                font-weight: 500;
                line-height: 3;
              `
            )}
          >
            <div className="col text-center">
              <img
                className="rounded-circle"
                src={`https://picsum.photos/256/256`}
              />
            </div>
            <div className="col">
              <div>{this.props.userInfo.name}</div>
              <div>{this.props.userInfo.phone}</div>
              <div>{this.props.userInfo.token}</div>
            </div>
            <div className="col text-center">12 метеоров</div>
          </div>
        </div>

        <AccountMeteorHistory />
        <AccountOrderHistory />
      </div>
    )
  }
}

export default compose(
  withUser,
  withTheme
)(AccountWrapper)
