import * as React from "react"
import {Link, Route, Switch} from "react-router-dom"
import Main from "./Main"

export const Pages = () => (
  <Switch>
    <Route path="/main" component={Main} />
    <Route
      // tslint:disable-next-line:jsx-no-lambda
      render={() => (
        <>
          <h1>Pages</h1>
          <ul>
            <li>
              <Link to="/main">Main</Link>
            </li>
          </ul>
        </>
      )}
    />
  </Switch>
)

export default Pages
