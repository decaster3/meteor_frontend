import * as React from "react"
import Icon from "react-fa"

// @ts-ignore
import * as styles from "./index.module.scss"
import logo from "./logo.svg"
import {City} from "../../containers/App/actions"
import {User} from "../../containers/UserSession/actions"
import {Status} from "../../constants"
import {UserStatus} from "../../containers/UserSession/constants"
import {Col, Row} from "reactstrap"

const pages = ["City", "Menu", "Sales", "Profile", "Cart"]

const Header = (props: {
  citiesStatus: Status
  cities: City[]
  userStatus: UserStatus
  user: User
}) => (
  <Row className="align-items-center pt-3">
    <Col xs="6" md="3">
      <div className={styles.logo}>
        <img src={logo} />
      </div>
    </Col>

    <Col xs="6" md="2">
      <div className={styles.call}>
        <div>+7 727 321-22-21</div>
        <button>
          <Icon name="phone" /> Call me
        </button>
      </div>
    </Col>

    <Col className={styles.topNavbar}>
      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className={styles.topNavbarSeparator} />}
          <div>
            <a href="#">{page}</a>
          </div>
        </React.Fragment>
      ))}
    </Col>
  </Row>
)

export default Header
