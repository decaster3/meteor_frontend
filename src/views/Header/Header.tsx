import * as React from "react"
import Icon from "react-fa"

import * as styles from "./Header.module.scss"
import logo from "../../assets/logo.svg"
import {compose} from "redux"
import withGeolocation from "../../containers/Geolocation"
import {withUser} from "../../containers/UserSession"
import {User} from "../../containers/UserSession/actions"
import {Status} from "../../constants"
import {UserState} from "../../containers/UserSession/constants"
import {Col, Row, Navbar, Container, NavbarBrand} from "reactstrap"
import {City} from "../../containers/Geolocation/actions"

const pages = ["City", "Menu", "Sales", "Profile", "Cart"]

interface HeaderProps {
  citiesStatus: Status
  cities: City[]
  userInfoStatus: Status
  userInfo: User
  userState: UserState
}

const Header: React.StatelessComponent<HeaderProps> = props => (
  <Navbar fixed="top" expand="xl" className={styles.Navbar}>
    <Container>
      <Row className="w-100 align-items-center">
        <Col xs="6" sm="auto">
          <a href="/">
            <img src={logo} className={styles.logo} />
          </a>
        </Col>

        <Col xs="6" sm="auto" className={styles.phoneBlock}>
          <Row className="align-items-center justify-content-center">
            <Col xs="auto" lg="6">
              <div className={styles.phone}>+7 727 321-22-21</div>
            </Col>
            <div className="w-100 d-block d-lg-none" />
            <Col xs="auto" lg="6">
              <button className={styles.callMe}>
                <Icon name="phone" /> Call me
              </button>
            </Col>
          </Row>
        </Col>

        <Col>
          <div className={styles.topNavbar}>
            {pages.map((page, index) => (
              <React.Fragment key={index}>
                {index > 0 && <div className={styles.topNavbarSeparator} />}
                <div>
                  <a href="#">{page}</a>
                </div>
              </React.Fragment>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  </Navbar>
)

export default compose(withGeolocation, withUser)(Header)