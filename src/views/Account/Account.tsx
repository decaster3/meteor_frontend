import React from "react"
import {compose} from "redux"
import {
  withUser,
  UserDispatchProps,
  UserStateProps,
} from "../../containers/UserSession"
import AccountMeteorHistory from "./MeteorHistory"
import AccountOrderHistory from "./OrderHistory"
import {cx, css} from "emotion"
import {ThemeProps, styled} from "../App/Theme"
import {withTheme} from "../../../node_modules/emotion-theming"
import {PrimaryButtonAsLink} from "../PrimaryButton"

interface AccountProps extends UserStateProps, UserDispatchProps, ThemeProps {}

class Account extends React.Component<AccountProps> {
  static Subtitle = styled("h3")`
    color: ${props => props.theme.lighterGrey};
    margin-bottom: 24px; /* mb-4 */
    margin-top: 48px; /* mb-5 */
  `

  componentDidMount() {
    this.props.getUserInfo()
  }

  render() {
    return (
      <div>
        <h2 className="mb-4">Аккаунт</h2>
        <div>
          <div
            className={cx(
              "row align-items-center mb-5",
              css`
                color: ${this.props.theme.lighterGrey};
                font-weight: 500;
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
              <div
                className={css`
                  line-height: 3;
                `}
              >
                <div>{this.props.userInfo.name}</div>
                <div>{this.props.userInfo.phone}</div>
                <div>{this.props.userInfo.token}</div>
              </div>
            </div>

            <div className={cx("col text-center")}>
              <div>На вашем счету</div>
              <div
                className={css`
                  color: white;
                  font-size: 1.5em;
                  margin: 1em 0;
                `}
              >
                {this.props.userInfo.meteors
                  .map(x => x.value)
                  .reduce(
                    (prevVal, currentVal) => prevVal + currentVal,
                    0
                  )}{" "}
                <small>метеоров</small>
              </div>
              <div className="row justify-content-center">
                <div className="col-auto">
                  <PrimaryButtonAsLink to="/meteors">
                    Как это работает?
                  </PrimaryButtonAsLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Account.Subtitle>История заказов</Account.Subtitle>
        <AccountOrderHistory />

        <Account.Subtitle>История метеоров</Account.Subtitle>
        <AccountMeteorHistory />
      </div>
    )
  }
}

export default compose(
  withUser,
  withTheme
)(Account)
