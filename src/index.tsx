// tslint:disable-next-line:no-submodule-imports no-implicit-dependencies
import createHistory from "history/createBrowserHistory"
import * as React from "react"
import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {ConnectedRouter} from "react-router-redux"

// Vendor styles
// tslint:disable-next-line:no-submodule-imports
import "bootstrap/dist/css/bootstrap.min.css"
// tslint:disable-next-line:no-submodule-imports
import "bootstrap/dist/css/bootstrap.min.css.map"

// Vendor JS
// tslint:disable-next-line:no-submodule-imports
import "bootstrap/dist/js/bootstrap.bundle"

import configureStore from "./configureStore"
import App from "./views/App"
import LanguageProvider from "./containers/LanguageProvider"
import {translationMessages} from "./i18n"
import {saveState} from "./localStorage"
import registerServiceWorker from "./registerServiceWorker"

// Create redux store with history
export interface State {
  userSession: object
}

const initialState = {}
const history = createHistory()
const store = configureStore(initialState, history)
const MOUNT_NODE = document.getElementById("root")

store.subscribe(() => {
  saveState({
    userSession: store.getState().get("userSession"),
    language: store.getState().get("language"),
    cart: store.getState().get("cart"),
    geolocation: store.getState().get("geolocation"),
  })
})

const render = (messages: any) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  )
}

if ((module as any).hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  ;(module as any).hot.accept(["./i18n", "./views/App"], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE as HTMLElement)
    render(translationMessages)
  })
}

// Chunked polyfill for browsers without Intl support
if (!(window as any).Intl) {
  import("intl")
    // @ts-ignore
    // tslint:disable-next-line:no-submodule-imports
    .then(() => Promise.all([import("intl/locale-data/jsonp/en")]))
    .then(() => render(translationMessages))
} else {
  render(translationMessages)
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === "production") {
  // tslint:disable-next-line:no-var-requires no-submodule-imports
  require("offline-plugin/runtime").install() // eslint-disable-line global-require
}

// registerServiceWorker()
