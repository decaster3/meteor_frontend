import * as React from "react"
import {connect} from "react-redux"
import {withRouter, Switch, Route} from "react-router-dom"
import Layout from "./containers/Layout"
import Main from "./components/Pages/Main"
import TestUserSession from "./containers/UserSession"

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact={true} path="/" component={Main} />
        <Route path="/hui" component={TestUserSession} />
      </Switch>
    </Layout>
  )
}

export default withRouter(App)
