import * as React from "react"
import Icon from "react-fa"
import styled from "styled-components"

import * as styles from "./App.module.scss"
import Header from "../Header"
import Footer from "../Footer"
import {Status} from "../../constants"
import {City, Category} from "../../containers/App/actions"
import {User} from "../../containers/UserSession/actions"
import {UserState} from "../../containers/UserSession/constants"
import {Container, Row} from "reactstrap"
import {ThemeProvider} from "styled-components"

const theme = {
  darkGrey: "hsl(199, 20%, 16%)",
  grey: "hsl(200, 23%, 24%)",
  lightGrey: "hsl(199, 28%, 32%)",
  lighterGrey: "hsl(199, 28%, 57%)",

  darkBlue: "hsl(232, 60%, 5%)",
  blue: "hsl(226, 54%, 13%)",

  yellow: "hsl(49, 95%, 55%)",
  orange: "hsl(33, 99%, 50%)",
  redOrange: "hsl(10, 73%, 52%)",

  lightGreen: "hsl(78, 69%, 35%)",
  darkGreen: "hsl(91, 71%, 27%)",
}

const StyledDiv = styled.div`
  color: ${props => props.theme.lighterGrey};
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
  <ThemeProvider theme={theme}>
    <div className={styles.backdrop}>
      <StyledDiv>kjdne</StyledDiv>
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
  </ThemeProvider>
)

export default App
