import * as cn from "classnames"
import * as React from "react"
import Icon from "react-fa"

// @ts-ignore
import * as styles from "./Header.module.scss"
import logo from "./logo.svg"
import {City} from "../../containers/App/actions"
import {User} from "../../containers/UserSession/actions"
import {Status} from "../../constants"

const pages = ["City", "Menu", "Sales", "Profile", "Cart"]

const Header = (props: {
  citiesStatus: Status
  cities: City[]
  userStatus: Status
  user: User
}) => (
  <div className="row align-items-center">
    <div className="col-3">
      <div className={styles.logo}>
        <img src={logo} />
      </div>
    </div>

    <div className="col-2">
      <div className={styles.call}>
        <div>+7 727 321-22-21</div>
        <button>
          <Icon name="phone" /> Call me back
        </button>
      </div>
    </div>

    <div className={cn(styles.topNavbar, "col")}>
      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className={styles.topNavbarSeparator} />}
          <div>
            <a href="#">{page}</a>
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
)

export default Header