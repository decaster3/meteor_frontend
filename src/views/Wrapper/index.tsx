import * as React from "react"
import Icon from "react-fa"

import * as styles from "./index.module.scss"
import Header from "../Header"
import Footer from "../Footer"
import {Status} from "../../constants"
import {City, Category} from "../../containers/App/actions"
import {User} from "../../containers/UserSession/actions"
import {UserStatus} from "../../containers/UserSession/constants"
import {Container, Row} from "reactstrap"

const Wrapper = (props: {
  children?: React.ReactNode
  citiesStatus: Status
  cities: City[]
  userStatus: UserStatus
  user: User
  categoriesStatus: Status
  categories: Category[]
}) => (
  <div className={styles.backdrop}>
    <Header
      cities={props.cities}
      citiesStatus={props.citiesStatus}
      userStatus={props.userStatus}
      user={props.user}
    />
    <Container className={styles.container}>
      <Row className={styles.content}>
        <Container fluid={true} className="py-3">
          {props.children}
        </Container>
      </Row>
      <Footer
        categoriesStatus={props.categoriesStatus}
        categories={props.categories}
      />
    </Container>
  </div>
)

export default Wrapper
