/**
 * Create the store with dynamic reducers
 */

import {fromJS} from "immutable"
// tslint:disable-next-line:no-var-requires
import {routerMiddleware} from "react-router-redux"
import {applyMiddleware, compose, createStore} from "redux"
import {loadState} from "./localStorage"
import createReducer from "./reducers"

// tslint:disable-next-line:no-var-requires
const thunk = require("redux-thunk").default

export const configureStore = (initialState = {}, history: any) => {
  const persistedState = loadState()

  const middlewares = [thunk, routerMiddleware(history)]

  const enhancers = [applyMiddleware(...middlewares)]

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

  const store = createStore(
    // @ts-ignore
    createReducer(),
    persistedState || fromJS(initialState),
    composeEnhancers(...enhancers)
  )

  // Extensions
  // @ts-ignore
  store.injectedReducers = {}
  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if ((module as any).hot) {
    ;(module as any).hot.accept("./reducers", () => {
      // @ts-ignore
      store.replaceReducer(createReducer(store.injectedReducers))
    })
  }

  return store
}

export default configureStore
