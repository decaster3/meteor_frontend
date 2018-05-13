import * as React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import Pages from "../../components/Pages"

const App = () => <Pages />

export default withRouter(connect()(App) as any)
