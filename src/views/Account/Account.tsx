import React from "react"
import {compose} from "redux"
import {
  withUser,
  UserDispatchProps,
  UserStateProps,
} from "../../containers/UserSession"
import BonusHistory from "./BonusHistory"
import OrderHistory from "./OrderHistory"
import {cx, css} from "emotion"
import {ThemeProps, styled, JS_HREF} from "../App/Theme"
import {withTheme} from "../../../node_modules/emotion-theming"
import {PrimaryButtonAsLink} from "../PrimaryButton"
import {Nav, NavItem, NavLink, TabContent, TabPane, Row, Col} from "reactstrap"
import Icon from "react-fa"

interface AccountProps extends UserStateProps, UserDispatchProps, ThemeProps {}

type TabType = "order-history" | "meteor-history" | "settings"

interface AccountState {
  activeTab: TabType
}

class Account extends React.Component<AccountProps, AccountState> {
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
                .reduce((prevVal, currentVal) => prevVal + currentVal, 0)}{" "}
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

        <div
          className={css`
            background: ${this.props.theme.darkBlue};
            margin: 16px -32px;
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
  withTheme
)(Account)
