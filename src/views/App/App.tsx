import {ThemeProvider} from "emotion-theming"
import * as React from "react"
import {compose} from "redux"
import {Switch, Route, withRouter} from "react-router-dom"

import {Container, Row} from "reactstrap"

import Menu from "../../views/MainContentPlaceholder/Menu"
import MainPage from "../../views/MainPage"
import Cart from "../../views/Cart"

import {Status} from "../../constants"
import {User} from "../../containers/UserSession/actions"
import {UserState} from "../../containers/UserSession/constants"
import Footer from "../Footer"
import Header from "../Header"
import * as styles from "./App.module.scss"
import {theme} from "./Theme"
import {Category} from "../../containers/Product/actions"

import withGeolocation from "../../containers/Geolocation"
import {withUser} from "../../containers/UserSession"
import withCategories from "../../containers/Category"
import {City} from "../../containers/Geolocation/actions"

interface AppProps {
  citiesStatus: Status
  cities: City[]

  userInfo: User
  userState: UserState

  categoriesStatus: Status
  categories: Category[]
}

const App: React.StatelessComponent<AppProps> = props => (
  <ThemeProvider theme={theme}>
    <div className={styles.backdrop}>
      <Header />
      <Container className={styles.container}>
        <Row className={styles.content}>
          <Container fluid={true} className="py-3">
            <Switch>
              <Route
                path="/invite/:inviterToken"
                exact={true}
                component={MainPage}
              />
              <Route path="/" exact={true} component={MainPage} />
              <Route path="/menu" component={Menu} />
              <Route path="/cart" component={Cart} />
              <Route />
            </Switch>
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

export default compose<React.ComponentType>(
  withRouter,
  withGeolocation,
  withUser,
  withCategories
)(App)
