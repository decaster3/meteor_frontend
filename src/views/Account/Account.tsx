import React from "react"
import {compose} from "redux"
import {withUser, UserProps} from "../../containers/UserSession"
import withGeolocation, {GeolocationProps} from "../../containers/Geolocation"
import BonusHistory from "./BonusHistory"
import OrderHistory from "./OrderHistory"
import {css, cx} from "emotion"
import {ThemeProps, styled} from "../App/emotion"
import {withTheme} from "emotion-theming"
import {PrimaryButtonAsLink} from "../PrimaryButton"
import {Nav, NavItem, NavLink, TabContent, TabPane, Row, Col} from "reactstrap"
import Icon from "react-fa"
import {JS_HREF, Status} from "../../constants"

interface AccountProps extends UserProps, ThemeProps {}

type TabType = "order-history" | "meteor-history" | "settings"

interface AccountState {
  activeTab: TabType
}

class Account extends React.Component<
  AccountProps & GeolocationProps,
  AccountState
> {
  static Subtitle = styled("h3")`
    color: ${props => props.theme.lighterGrey};
    margin-bottom: 24px; /* mb-4 */
    margin-top: 48px; /* mb-5 */
  `

  static Icon = styled(Icon)`
    font-size: 48px;
    margin: 8px;
    transition: all 200ms;
  `

  static NavLink = styled(NavLink)`
    color: ${props => props.theme.lighterGrey};
    font-weight: 700;
    padding: 16px;

    :hover,
    :focus {
      color: ${props => props.theme.lighterGrey};
    }

    &.active {
      color: ${props => props.theme.lightestGrey};

      > .fa {
        font-size: 64px;
        margin: 0;
      }
    }
  `

  static AccountInfoItem = styled("div")`
    padding: 16px 0;

    & + & {
      border-top: 2px solid ${props => props.theme.lightGrey};
    }
  `

  state: AccountState = {activeTab: "order-history"}

  componentDidMount() {
    this.props.getUserInfo()
  }

  toggle = (tab: TabType) => {
    this.setState(prevState => {
      return prevState.activeTab !== tab ? {activeTab: tab} : null
    })
  }

  render() {
    return (
      <div>
        <h2 className="mb-4">Аккаунт</h2>

        <div className="text-lightergrey fw-medium">
          <div className={"row align-items-center mb-5"}>
            <div className="col-4 text-center">
              <img
                className="rounded-circle"
                src={`http://via.placeholder.com/256x256`}
              />
            </div>

            <div className="col-4">
              <Account.AccountInfoItem>
                {this.props.userInfo.name}
              </Account.AccountInfoItem>

              <Account.AccountInfoItem>
                {this.props.userInfo.phone}
              </Account.AccountInfoItem>

              <Account.AccountInfoItem>
                {this.props.userInfo.token}
              </Account.AccountInfoItem>
            </div>

            <div className={"col-4 text-center"}>
              <div>На вашем счету</div>
              <div className={"text-white h3 mb-0 py-3"}>
                {this.props.userInfoStatus === Status.LOADED
                  ? this.props.userInfo.meteors
                      .map(x => x.value)
                      .reduce((prevVal, currentVal) => prevVal + currentVal, 0)
                  : 0}
                <small> метеоров - {this.props.defaultCity.currency}</small>
              </div>
              <div className="row justify-content-center">
                <div className="col-auto">
                  <PrimaryButtonAsLink to="/bonus-system">
                    Как это работает?
                  </PrimaryButtonAsLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={css`
            background: ${this.props.theme.darkBlue};
            margin: 24px -32px;
          `}
        >
          <Nav className="row text-center">
            <NavItem className="col">
              <Account.NavLink
                href={JS_HREF}
                className={cx({
                  active: this.state.activeTab === "order-history",
                })}
                onClick={() => this.toggle("order-history")}
              >
                <Account.Icon name="history" />
                <p className="mb-0">История заказов</p>
              </Account.NavLink>
            </NavItem>

            <NavItem className="col">
              <Account.NavLink
                href={JS_HREF}
                className={cx({
                  active: this.state.activeTab === "meteor-history",
                })}
                onClick={() => this.toggle("meteor-history")}
              >
                <Account.Icon name="gift" />
                <p className="mb-0">История бонусов</p>
              </Account.NavLink>
            </NavItem>

            <NavItem className="col">
              <Account.NavLink
                href={JS_HREF}
                className={cx({
                  active: this.state.activeTab === "settings",
                })}
                onClick={() => this.toggle("settings")}
              >
                <Account.Icon name="cog" />
                <p className="mb-0">Настройки</p>
              </Account.NavLink>
            </NavItem>
          </Nav>
        </div>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="order-history">
            <OrderHistory />
          </TabPane>
          <TabPane tabId="meteor-history">
            <BonusHistory />
          </TabPane>
          <TabPane tabId="settings" />
        </TabContent>
      </div>
    )
  }
}

export default compose(
  withUser,
  withGeolocation,
  withTheme
)(Account)
