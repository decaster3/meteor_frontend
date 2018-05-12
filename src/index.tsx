import createHistory from "history/createBrowserHistory"
import * as React from "react"
import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {ConnectedRouter} from "react-router-redux"
// Import root app
import configureStore from "./configureStore"
// eslint-disable-next-line
import App from "./containers/App"
import LanguageProvider from "./containers/LanguageProvider"
import {translationMessages} from "./i18n"
import {saveState} from "./localStorage"
import registerServiceWorker from "./registerServiceWorker"

// Create redux store with history
const initialState = {}
const history = createHistory()
const store = configureStore(initialState, history)
const MOUNT_NODE = document.getElementById("root")

store.subscribe(() => {
  saveState({})
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
  ;(module as any).hot.accept(["./i18n", "./containers/App"], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE as HTMLElement)
    render(translationMessages)
  })
}
// Chunked polyfill for browsers without Intl support
if (!(window as any).Intl) {
  new Promise(resolve => {
    resolve(import("intl"))
  })
    // @ts-ignore
    .then(() => Promise.all([import("intl/locale-data/jsonp/en")]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err
    })
} else {
  render(translationMessages)
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === "production") {
  // tslint:disable-next-line:no-var-requires
  require("offline-plugin/runtime").install() // eslint-disable-line global-require
}

registerServiceWorker()
