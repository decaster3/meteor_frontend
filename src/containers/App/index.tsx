import * as React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import A from "../UserSession"
const App = () => (
  <div>
    <A />
  </div>
)

export default withRouter(connect()(App) as any)
