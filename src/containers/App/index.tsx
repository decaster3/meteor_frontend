import * as React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"

const App = () => <div>hello</div>

export default withRouter(connect()(App) as any)
