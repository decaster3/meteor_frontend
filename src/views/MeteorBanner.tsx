import React, {Component} from "react"
import {compose} from "redux"
import {css} from "emotion"
import {Col, Row} from "reactstrap"

import symbol from "../assets/logo_meteor.png"
import {Status} from "../constants"
import {UserInfo} from "../containers/UserSession/actions"
import {UserState} from "../containers/UserSession/constants"
import SignUp from "./AuthWrapper"
import {withUser} from "../containers/UserSession"
import withGeolocation, {GeolocationProps} from "../containers/Geolocation"
import {ThemeProps, withTheme} from "./App/emotion"

interface MeteorBannerProps {
  userState: UserState
  userInfoStatus: Status
  userInfo: UserInfo
}

interface MeteorBannerState {
  authModalShown: boolean
}

class MeteorBanner extends Component<
  MeteorBannerProps & ThemeProps & GeolocationProps,
  MeteorBannerState
> {
  state: MeteorBannerState = {
    authModalShown: false,
  }

  toggleAuthModal = () =>
    this.setState(prevState => ({authModalShown: !prevState.authModalShown}))

  render() {
    const {text, amount} =
      this.props.userState === UserState.ANONYMOUS
        ? {
            text: "Зарегестрируйся",
            amount: this.props.defaultCity.registrationBonus,
          }
        : {text: "Пригласи друга", amount: this.props.defaultCity.inviteBonus}
    return (
      <Row
        className={css`
          flex: 1;
          padding: 1rem 0;
          color: ${this.props.theme.lighterGrey};
          font-weight: 500;
          line-height: 2;
          font-size: 1.25rem;
          align-items: center;
          height: 100%;
        `}
      >
        <Col>
          <button
            onClick={this.toggleAuthModal}
            className={css`
              background-color: ${this.props.theme.lightGreen};
              color: white;
              text-transform: uppercase;
              font-weight: 500;
              border: none;
              padding: 0.5rem 1rem;
              border-radius: 0.25rem;
              letter-spacing: 0.125em;

              &:focus,
              &:hover {
                background-color: ${this.props.theme.darkGreen};
              }
            `}
          >
            {text}
          </button>
          <SignUp
            modalShown={this.state.authModalShown}
            toggle={this.toggleAuthModal}
            registrationFirst={true}
          />
          <div>и получи</div>
          <div
            className={css`
              font-size: 4rem;
              line-height: 4.5rem;
              font-weight: 700;
              color: ${this.props.theme.orange};
            `}
          >
            {amount}
          </div>
          <div
            className={css`
              color: ${this.props.theme.orange};
              font-size: 2rem;
              line-height: 3rem;
            `}
          >
            метеоров
          </div>
          <div>Чтобы обменять их на еду</div>
        </Col>
        <Col
          xs="auto"
          className={css`
            flex: 1 1;

            img {
              width: 100%;
            }
          `}
        >
          <img src={symbol} />
        </Col>
      </Row>
    )
  }
}

export default compose<any>(
  withUser,
  withTheme,
  withGeolocation
)(MeteorBanner)
