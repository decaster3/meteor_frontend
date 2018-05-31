import * as React from "react"
import Icon from "react-fa"
// import styled from "styled-components"

import * as styles from "./App.module.scss"
import Header from "../Header"
import Footer from "../Footer"
import {Status} from "../../constants"
import {User} from "../../containers/UserSession/actions"
import {UserState} from "../../containers/UserSession/constants"
import {Container, Row} from "reactstrap"

const App: React.StatelessComponent<{}> = props => (
  <div className={styles.backdrop}>
    <Header />
    <Container className={styles.container}>
      <Row className={styles.content}>
        <Container fluid={true} className="py-3">
          {props.children}
        </Container>
      </Row>
      <Footer />
    </Container>
  </div>
)

export default App
