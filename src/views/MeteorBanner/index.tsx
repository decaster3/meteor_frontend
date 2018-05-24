import * as React from "react"
import Icon from "react-fa"
import * as cn from "classnames"

import symbol from "./logo_meteor.png"
import {Status} from "../../constants"
import * as styles from "./index.module.scss"
import {User} from "../../containers/UserSession/actions"
import {UserStatus} from "../../containers/UserSession/constants"
import SignUp from "../../containers/UserSession"
import {Col, Row} from "reactstrap"

const MeteorBanner = (props: {userState: string; userInfo: User}) => {
  const {text, amount} =
    props.userState === UserStatus.ANONYMOUS
      ? {text: "Зарегестрируйся", amount: 500}
      : {text: "Пригласи друга", amount: 200}
  return (
    <div className={styles.signupBannerWrapper}>
      <Row className={cn("align-items-center", styles.signupBanner)}>
        <Col className={styles.textBanner}>
          <SignUp registrationFirst={true}>
            <button className={styles.signupButton}>{text}</button>
          </SignUp>
          <div>и получи</div>
          <div className={styles.meteorValue}>{amount}</div>
          <div className={styles.meteorCurrency}>метеоров</div>
          <div>Чтобы обменять их на еду</div>
        </Col>
        <Col xs="auto">
          <img className={styles.image} src={symbol} />
        </Col>
      </Row>
    </div>
  )
}

export default MeteorBanner
