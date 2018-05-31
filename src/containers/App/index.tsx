/*
 * User
 */
import * as React from "react"
import {connect} from "react-redux"
import {compose, Dispatch} from "redux"
import {State} from "../../"
import Header from "../../views/Header"
import App from "../../views/App"
import Footer from "../../views/Footer"
import Menu from "../../views/MainContentPlaceholder/Menu"
import MainPage from "../../views/MainPage"
import Cart from "../../views/Cart"
import {Switch, Route, withRouter} from "react-router-dom"

const Layout: React.StatelessComponent<{}> = props => (
  <App>
    <Switch>
      <Route path="/invite/:inviterToken" exact={true} component={MainPage} />
      <Route path="/" exact={true} component={MainPage} />
      <Route path="/empty" />
      <Route path="/menu" component={Menu} />
      <Route path="/cart" component={Cart} />
    </Switch>
  </App>
)

export default Layout
