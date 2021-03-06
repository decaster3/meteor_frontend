import React, {Component} from "react"
import {compose} from "redux"
import {css} from "emotion"
import {Col, Row} from "reactstrap"
import {Redirect} from "react-router-dom"
import symbol from "../assets/logo_meteor.png"
import {Status} from "../constants"
import {UserInfo} from "../containers/UserSession/actions"
import {UserState} from "../containers/UserSession/constants"
import SignUp from "./AuthWrapper"
import {withUser} from "../containers/UserSession"
import withGeolocation, {GeolocationProps} from "../containers/Geolocation"
import {theme} from "./App/emotion"

interface MeteorBannerProps {
  userState: UserState
  userInfoStatus: Status
  userInfo: UserInfo
}

interface MeteorBannerState {
  authModalShown: boolean
  isRedirect: boolean
}

class MeteorBanner extends Component<
  MeteorBannerProps & GeolocationProps,
  MeteorBannerState
> {
  state: MeteorBannerState = {
    authModalShown: false,
    isRedirect: false,
  }

  toggleAuthModal = () =>
    this.setState(prevState => ({authModalShown: !prevState.authModalShown}))

  redirect = () => this.setState({isRedirect: true})

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
          color: ${theme.lighterGrey};
          font-weight: 500;
          line-height: 2;
          font-size: 1.25rem;
          align-items: center;
          height: 100%;
        `}
      >
        {this.state.isRedirect ? <Redirect to="/bonus-system" /> : <div />}
        <Col>
          <button
            onClick={
              this.props.userState === UserState.ANONYMOUS
                ? this.toggleAuthModal
                : this.redirect
            }
            className={css`
              background-color: ${theme.lightGreen};
              color: white;
              text-transform: uppercase;
              font-weight: 500;
              border: none;
              padding: 0.5rem 1rem;
              border-radius: 0.25rem;
              letter-spacing: 0.125em;

              &:focus,
              &:hover {
                background-color: ${theme.darkGreen};
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
              color: ${theme.orange};
            `}
          >
            {amount}
          </div>
          <div
            className={css`
              color: ${theme.orange};
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
  withGeolocation
)(MeteorBanner)
