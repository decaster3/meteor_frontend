import * as React from "react"
import Icon from "react-fa"
import styled from "styled-components"

import * as styles from "./index.module.scss"
import Header from "../Header"
import Footer from "../Footer"
import {Status} from "../../constants"
import {City, Category} from "../../containers/App/actions"
import {User} from "../../containers/UserSession/actions"
import {UserState} from "../../containers/UserSession/constants"
import {Container, Row} from "reactstrap"

const StyledDiv = styled.div`
  color: lighten(#000, 20%);
`

const App = (props: {
  children?: React.ReactNode

  citiesStatus: Status
  cities: City[]

  userInfoStatus: Status
  userInfo: User
  userState: UserState

  categoriesStatus: Status
  categories: Category[]
}) => (
  <div className={styles.backdrop}>
    <Header
      cities={props.cities}
      citiesStatus={props.citiesStatus}
      userInfoStatus={props.userInfoStatus}
      userInfo={props.userInfo}
      userState={props.userState}
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

export default App
