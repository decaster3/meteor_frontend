import React from "react"
import Icon from "react-fa"
import {compose} from "redux"
import {css, cx} from "emotion"
import {Col, Row} from "reactstrap"

import symbol from "../../assets/logo_meteor.png"
import {Status} from "../../constants"
import {UserInformation} from "../../containers/UserSession/actions"
import {UserState} from "../../containers/UserSession/constants"
import SignUp from "../AuthWrapper"
import {withUser} from "../../containers/UserSession"
import {ThemeProps, withTheme} from "../App/Theme"

interface MeteorBannerProps {
  userState: UserState
  userInfoStatus: Status
  userInfo: UserInformation
}

const MeteorBanner = (props: MeteorBannerProps & ThemeProps) => {
  const {text, amount} =
    props.userState === UserState.ANONYMOUS
      ? {text: "Зарегестрируйся", amount: 500}
      : {text: "Пригласи друга", amount: 200}
  return (
    <Row
      className={css`
        flex: 1;
        padding: 1rem 0;
        color: ${props.theme.lighterGrey};
        font-weight: 500;
        line-height: 2;
        font-size: 1.25rem;
        align-items: center;
        height: 100%;
      `}
    >
      <Col>
        <SignUp registrationFirst={true}>
          <button
            className={css`
              background-color: ${props.theme.lightGreen};
              color: white;
              text-transform: uppercase;
              font-weight: 500;
              border: none;
              padding: 0.5rem 1rem;
              border-radius: 0.25rem;
              letter-spacing: 0.125rem;

              &:focus,
              &:hover {
                background-color: ${props.theme.darkGreen};
              }
            `}
          >
            {text}
          </button>
        </SignUp>
        <div>и получи</div>
        <div
          className={css`
            font-size: 4rem;
            line-height: 4.5rem;
            font-weight: 700;
            color: ${props.theme.orange};
          `}
        >
          {amount}
        </div>
        <div
          className={css`
            color: ${props.theme.orange};
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

export default compose(
  withUser,
  withTheme
)(MeteorBanner)
