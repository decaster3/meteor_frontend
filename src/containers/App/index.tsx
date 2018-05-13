import * as React from "react"
import {connect} from "react-redux"
import {Route, Switch, withRouter} from "react-router-dom"
import Main from "../../pages/Main"

const App = () => (
  <Switch>
    <Route path="/" component={Main} />
  </Switch>
)

export default withRouter(connect()(App) as any)
