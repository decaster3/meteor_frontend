import React from "react"
import {compose} from "redux"
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap"
import Icon from "react-fa"
import {css, cx} from "emotion"

import {withUser, UserProps} from "../../containers/UserSession"
import withGeolocation, {GeolocationProps} from "../../containers/Geolocation"
import BonusHistory from "./BonusHistory"
import OrderHistory from "./OrderHistory"
import Settings from "./Settings"
import {styled, mediaBreakpointUp, theme} from "../App/emotion"
import {PrimaryButtonAsLink} from "../PrimaryButton"
import {JS_HREF, Status} from "../../constants"

interface AccountProps extends UserProps, GeolocationProps {}

type TabType = "order-history" | "meteor-history" | "settings"

interface AccountState {
  activeTab: TabType
}

class Account extends React.Component<AccountProps, AccountState> {
  static Subtitle = styled("h3")`
    color: ${theme.lighterGrey};
    margin-bottom: 24px; /* mb-4 */
    margin-top: 48px; /* mb-5 */
  `

  static NavLink = styled(NavLink)`
    color: ${theme.lighterGrey};
    font-weight: 700;
    padding: 16px 0;
    :hover,
    :focus {
      color: ${theme.lighterGrey};
    }
    > .fa {
      font-size: 32px;
      margin: 8px;
      transition: all 200ms;
    }
    &.active {
      color: ${theme.lightestGrey};
      > .fa {
        font-size: 48px;
        margin: 0;
      }
    }
    ${mediaBreakpointUp("lg")} {
      > .fa {
        font-size: 48px;
      }
      &.active > .fa {
        font-size: 64px;
      }
    }
  `

  static AccountInfoItem = styled("div")`
    padding: 16px 0;

    & + & {
      border-top: 2px solid ${theme.lightGrey};
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
            <div className="col-12 col-lg-6">
              <Account.AccountInfoItem>
                <div className="row">
                  <span className="col">Имя:</span>{" "}
                  <span
                    className={cx(
                      "col",
                      css`
                        color: ${theme.orange};
                      `
                    )}
                  >
                    {this.props.userInfo.name}
                  </span>
                </div>
              </Account.AccountInfoItem>

              <Account.AccountInfoItem>
                <div className="row">
                  <span className="col">Телефон:</span>{" "}
                  <span
                    className={cx(
                      "col",
                      css`
                        color: ${theme.orange};
                      `
                    )}
                  >
                    {this.props.userInfo.phone}
                  </span>
                </div>
              </Account.AccountInfoItem>

              <Account.AccountInfoItem>
                <div className="row">
                  <span className="col">Код для приглашения:</span>{" "}
                  <span
                    className={cx(
                      "col",
                      css`
                        color: ${theme.orange};
                      `
                    )}
                  >
                    {this.props.userInfo.token}
                  </span>
                </div>
              </Account.AccountInfoItem>
            </div>

            <div className={"col-12 col-lg-6 text-center"}>
              <div>На вашем счету</div>
              <div className={"text-white h3 mb-0 py-3"}>
                {this.props.userInfoStatus === Status.LOADED
                  ? this.props.possibleMeteors
                  : 0}
                <small>
                  {" "}
                  метеоров(
                  {this.props.defaultCity.name})
                </small>
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
            background: ${theme.darkBlue};
            margin: 24px -32px;
            padding: 0 15px;
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
                <Icon name="history" />
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
                <Icon name="gift" />
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
                <Icon name="cog" />
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
          <TabPane tabId="settings">
            <Settings />
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

export default compose(
  withGeolocation,
  withUser
)(Account)
