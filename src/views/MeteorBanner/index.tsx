import * as React from "react"
import Icon from "react-fa"
import * as cn from "classnames"
import symbol from "./logo_meteor.png"
import {Status} from "../../constants"
// @ts-ignore
import * as styles from "./Menu.module.scss"
import {User} from "../../containers/UserSession/actions"
import {UserStatus} from "../../containers/UserSession/constants"

const MeteorBanner = (props: {userState: string; userInfo: User}) => {
  if (props.userState === UserStatus.ANONYMOUS) {
    return (
      <div className={cn("col", styles.signupBannerWrapper)}>
        <div className={cn("row align-items-center", styles.signupBanner)}>
          <div className={cn("col", styles.textBanner)}>
            <button className={styles.signupButton}>Зарегестрируйся</button>
            <div>и получи</div>
            <div className={styles.meteorValue}>500</div>
            <div className={styles.meteorCurrency}>метеоров</div>
            <div>Чтобы обменять их на еду</div>
          </div>
          <div className={cn("col-auto")}>
            <img src={symbol} />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={cn("col", styles.signupBannerWrapper)}>
      <div className={cn("row align-items-center", styles.signupBanner)}>
        <div className={cn("col", styles.textBanner)}>
          <button className={styles.signupButton}>Иди нахуй</button>
          <div>и получи</div>
          <div className={styles.meteorValue}>500</div>
          <div className={styles.meteorCurrency}>метеоров</div>
          <div>Чтобы обменять их на еду</div>
        </div>
        <div className={cn("col-auto")}>
          <img src={symbol} />
        </div>
      </div>
    </div>
  )
}

export default MeteorBanner
