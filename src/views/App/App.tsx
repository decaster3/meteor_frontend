import {ThemeProvider} from "emotion-theming"
import React from "react"
import {compose} from "redux"
import {Switch, Route, withRouter, RouteComponentProps} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import {ToastContainer} from "react-toastify"
import {transparentize} from "polished"

import MainPage from "../MainPage"
import Cart from "../Cart"
import {UserState} from "../../containers/UserSession/constants"
import Footer from "../Footer"
import Header from "../Header"
import {theme, styled} from "./emotion"
import withGeolocation, {GeolocationProps} from "../../containers/Geolocation"
import {withUser, UserProps} from "../../containers/UserSession"
import withCategories, {CategoriesProps} from "../../containers/Category"
import Account from "../Account"
import pattern from "../../assets/pattern.png"
import Checkout from "../Checkout"
import {injectGlobal} from "emotion"
import NotFound from "../NotFound"
import Promotions from "../Promotions/Promotions"
import ProductView from "../ProductView"
import OrderCallback from "../../views/OrderCallback"
import BonusSystemDescription from "../BonusSystemDescription"
import DeliveryDescription from "../DeliveryDescription"
import AboutCompany from "../AboutCompany"

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

interface AppProps
  extends UserProps,
    CategoriesProps,
    GeolocationProps,
    RouteComponentProps<{}> {}

const fadedDarkBlue = transparentize(0.2, theme.darkBlue)
const fadedBlue = transparentize(0.2, theme.blue)

const Wrapper = styled("div")`
  flex: 1;
  padding-top: 56px;
  background-color: ${fadedDarkBlue};
`

const Container = styled("div")`
  display: flex;
  flex-flow: column;
  min-height: 100%;
`

const Content = styled("div")`
  background-color: ${fadedBlue};
  box-shadow: 0 0 6rem 0 black, 0 0 2rem 0 black;
  display: flex;
  flex-flow: column;
  flex: 1;
  margin: 0 -15px;
  padding: 32px;
`

const App: React.StatelessComponent<AppProps> = props => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <Header />

      <Container className="container">
        <Content>
          <ToastContainer />
          <Switch>
            <Route
              path="/invite/:inviterToken"
              exact={true}
              component={MainPage}
            />
            <Route path="/" exact={true} component={MainPage} />

            <Route
              path="/:category(pizza|burgers|sushi|snacks)"
              exact={true}
              component={MainPage}
            />

            <Route
              path="/:category(pizza|burgers|sushi|snacks)/:productId"
              exact={true}
              component={ProductView}
            />

            <Route path="/cart" exact={true} component={Cart} />
            <Route path="/checkout" exact={true} component={Checkout} />
            <Route path="/promotions" exact={true} component={Promotions} />

            <Route
              path="/bonus-system"
              exact={true}
              component={BonusSystemDescription}
            />
            <Route
              path="/about-company"
              exact={true}
              component={AboutCompany}
            />
            <Route
              path="/delivery"
              exact={true}
              component={DeliveryDescription}
            />

            <Route
              path="/order/:id/:status/:phone"
              exact={true}
              component={OrderCallback}
            />

            {props.userState === UserState.LOGED_IN && (
              <Route path="/account" exact={true} component={Account} />
            )}

            <Route component={NotFound} />
          </Switch>
        </Content>

        <Footer />
      </Container>
    </Wrapper>
  </ThemeProvider>
)

export default compose(
  withRouter,
  withGeolocation,
  withUser,
  withCategories
)(App)
