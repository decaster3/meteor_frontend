import {ThemeProvider} from "emotion-theming"
import * as React from "react"
import {Container, Row} from "reactstrap"

import {Status} from "../../constants"
import {Category, City} from "../../containers/App/actions"
import {User} from "../../containers/UserSession/actions"
import {UserState} from "../../containers/UserSession/constants"
import Footer from "../Footer"
import Header from "../Header"
import * as styles from "./App.module.scss"
import {theme} from "./Theme"

interface AppProps {
  citiesStatus: Status
  cities: City[]

  userInfoStatus: Status
  userInfo: User
  userState: UserState

  categoriesStatus: Status
  categories: Category[]
}

const App: React.StatelessComponent<AppProps> = props => (
  <ThemeProvider theme={theme}>
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
  </ThemeProvider>
)

export default App
