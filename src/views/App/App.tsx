import {ThemeProvider, withTheme} from "emotion-theming"
import React from "react"
import {compose} from "redux"
import {Switch, Route, withRouter} from "react-router-dom"
import {injectGlobal, css, cx} from "emotion"
import {Container, Row} from "reactstrap"
import {transparentize} from "polished"

import Menu from "../MainContentPlaceholder/Menu"
import MainPage from "../MainPage"
import Cart from "../Cart"
import {Status} from "../../constants"
import {UserInfo} from "../../containers/UserSession/actions"
import {UserState} from "../../containers/UserSession/constants"
import Footer from "../Footer"
import Header from "../Header"
import {theme} from "./Theme"
import {Category} from "../../containers/Products/actions"
import withGeolocation from "../../containers/Geolocation"
import {withUser} from "../../containers/UserSession"
import withCategories from "../../containers/Category"
import withAccount from "../AccountWrapper"
import Account from "../Account"
import {City} from "../../containers/Geolocation/actions"
import pattern from "../../assets/pattern.png"
import Checkout from "../Checkout"

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

  userInfo: UserInfo
  userState: UserState

  categoriesStatus: Status
  categories: Category[]
}

const fadedDarkBlue = transparentize(0.2, theme.darkBlue)
const fadedBlue = transparentize(0.2, theme.blue)

const App: React.StatelessComponent<AppProps> = props => (
  <ThemeProvider theme={theme}>
    <div
      className={css({
        flex: 1,
        paddingTop: "3.5rem",
        backgroundColor: fadedDarkBlue,
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
            boxShadow: "0 0 6rem 0 black, 0 0 2rem 0 black",
          })}
        >
          <div
            className={cx(
              "container-fluid",
              css`
                padding: 32px;
              `
            )}
          >
            <Switch>
              <Route
                path="/invite/:inviterToken"
                exact={true}
                component={MainPage}
              />
              <Route path="/" exact={true} component={MainPage} />
              <Route path="/pizza" exact={true} component={MainPage} />
              <Route path="/burgers" exact={true} component={MainPage} />
              <Route path="/sushi" exact={true} component={MainPage} />
              <Route path="/snacks" exact={true} component={MainPage} />
              <Route path="/menu" component={Menu} />
              <Route path="/cart" exact={true} component={Cart} />
              <Route path="/checkout" exact={true} component={Checkout} />
              {props.userState === UserState.LOGED_IN && (
                <Route path="/account" component={withAccount} />
              )}
              */}
            </Switch>
          </div>
        </Row>
        <Footer />
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
