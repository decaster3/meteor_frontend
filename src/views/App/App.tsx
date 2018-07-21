import {ThemeProvider as EmotionThemeProvider} from "emotion-theming"
import React from "react"
import {compose} from "redux"
import {Switch, Route, withRouter} from "react-router-dom"
import {transparentize} from "polished"

import styled, {injectGlobal, ThemeProvider} from "./styled"
import Menu from "../MainContentPlaceholder/Menu"
import MainPage from "../MainPage"
import Cart from "../Cart"
import {Status} from "../../constants"
import {UserInfo} from "../../containers/UserSession/actions"
import {UserState} from "../../containers/UserSession/constants"
import Footer from "../Footer"
import Header from "../Header"
import {theme} from "./emotion"
import {Category} from "../../containers/Products/actions"
import withGeolocation from "../../containers/Geolocation"
import {withUser} from "../../containers/UserSession"
import withCategories from "../../containers/Category"
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

const Wrapper = styled.div`
  flex: 1;
  padding-top: 56px;
  background-color: ${fadedDarkBlue};
`

const Container = styled.div.attrs({className: "container"})`
  display: flex;
  flex-flow: column;
  min-height: 100%;
`

const Content = styled.div`
  background-color: ${fadedBlue};
  box-shadow: 0 0 6rem 0 black, 0 0 2rem 0 black;
  flex: 1;
  margin: 0 -15px;
  padding: 32px;
`

const App: React.StatelessComponent<AppProps> = props => (
  <ThemeProvider theme={theme}>
    <EmotionThemeProvider theme={theme}>
      <Wrapper>
        <Header />

        <Container>
          <Content>
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
                <Route path="/account" component={Account} />
              )}
            </Switch>
          </Content>

          <Footer />
        </Container>
      </Wrapper>
    </EmotionThemeProvider>
  </ThemeProvider>
)

export default compose<React.ComponentType>(
  withRouter,
  withGeolocation,
  withUser,
  withCategories
)(App)
