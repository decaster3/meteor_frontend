import {ThemeProvider, withTheme} from "emotion-theming"
import * as React from "react"
import {compose} from "redux"
import {Switch, Route, withRouter} from "react-router-dom"
import {injectGlobal, css} from "emotion"
import {Container, Row} from "reactstrap"
import * as Color from "color"

import Menu from "../../views/MainContentPlaceholder/Menu"
import MainPage from "../../views/MainPage"
import Cart from "../../views/Cart"
import {Status} from "../../constants"
import {User} from "../../containers/UserSession/actions"
import {UserState} from "../../containers/UserSession/constants"
import Footer from "../Footer"
import Header from "../Header"
import {theme} from "./Theme"
import {Category} from "../../containers/Product/actions"
import withGeolocation from "../../containers/Geolocation"
import {withUser} from "../../containers/UserSession"
import withCategories from "../../containers/Category"
import Account from "../AccountMainInfo"
import {City} from "../../containers/Geolocation/actions"
import pattern from "../../assets/pattern.png"

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  html,
  body {
    height: 100%;
  }

  body {
    display: flex;
    flex-flow: column;
  }

  #root {
    flex: 1;
    display: flex;
    flex-flow: column;
  }

  html,
  body {
    background-size: 300px;
    background-image: url("${pattern}");
    background-color: ${theme.darkBlue};
  }
`

interface AppProps {
  citiesStatus: Status
  cities: City[]

  userInfo: User
  userState: UserState

  categoriesStatus: Status
  categories: Category[]
}

const fadedDarkBlue = Color(theme.darkBlue)
  .fade(0.5)
  .hsl()
  .string()

const fadedBlue = Color(theme.blue)
  .fade(0.5)
  .hsl()
  .string()

const App: React.StatelessComponent<AppProps> = props => (
  <ThemeProvider theme={theme}>
    <div
      className={css({
        flex: 1,
        paddingTop: "3.5rem",
        backgroundColor: fadedDarkBlue,
        background: `linear-gradient(
          ${theme.darkBlue},
          ${fadedDarkBlue},
          ${theme.darkBlue}
        )`,
      })}
    >
      <Header />
      <Container
        className={css`
          display: flex;
          flex-flow: column;
          min-height: 100%;
        `}
      >
        <Row
          className={css({
            flex: 1,
            backgroundColor: fadedBlue,
            background: `linear-gradient(
              ${fadedBlue},
              ${theme.blue},
              ${fadedBlue}
            )`,
            boxShadow: "0 0 6rem 0 black, 0 0 2rem 0 black",
          })}
        >
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
              {props.userState === UserState.LOGED_IN && (
                <Route path="/account" component={Account} />
              )}
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
