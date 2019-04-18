import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/css/bootstrap.min.css.map"
import "bootstrap/dist/js/bootstrap.bundle"
import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {BrowserRouter} from "react-router-dom"
import configureStore from "./configureStore"
import {saveState} from "./localStorage"
import "./main.scss"
import App from "./views/App"

const initialState = {}
export const store = configureStore(initialState)
const MOUNT_NODE = document.getElementById("root")

store.subscribe(() => {
  saveState({
    userSession: store.getState().get("userSession"),
    language: store.getState().get("language"),
    cart: store.getState().get("cart"),
    // geolocation: store.getState().get("geolocation"),
  })
})

const renderAtMountNode = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
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
    renderAtMountNode()
  })
}

// Chunked polyfill for browsers without Intl support
if (!(window as any).Intl) {
  import("intl")
    // @ts-ignore
    .then(() => Promise.all([import("intl/locale-data/jsonp/en")]))
    .then(() => renderAtMountNode())
} else {
  renderAtMountNode()
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === "production") {
  // tslint:disable-next-line:no-var-requires
  require("offline-plugin/runtime").install() // eslint-disable-line global-require
}

// registerServiceWorker()
