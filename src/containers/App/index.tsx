import * as React from "react"
import {withRouter, Switch, Route} from "react-router-dom"
import {connect} from "react-redux"

const App = (props: any) => <div>hello</div>

function mapStateToProps(state: any) {
  return {}
}

export default withRouter(connect(mapStateToProps, null)(App))
