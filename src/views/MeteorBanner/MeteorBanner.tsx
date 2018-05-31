import * as React from "react"
import Icon from "react-fa"
import * as cn from "classnames"
import {compose} from "redux"
import symbol from "../../assets/logo_meteor.png"
import {Status} from "../../constants"
import * as styles from "./MeteorBanner.module.scss"
import {User} from "../../containers/UserSession/actions"
import {UserState} from "../../containers/UserSession/constants"
import SignUp from "../AuthWrapper"
import {Col, Row} from "reactstrap"
import {withUser} from "../../containers/UserSession"

const MeteorBanner = (props: {userState: string; userInfo: User}) => {
  console.log(props.userState)
  const {text, amount} =
    props.userState === UserState.ANONYMOUS
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
        <Col xs="auto" className={styles.imageWrapper}>
          <img src={symbol} />
        </Col>
      </Row>
    </div>
  )
}

export default compose(withUser)(MeteorBanner)
