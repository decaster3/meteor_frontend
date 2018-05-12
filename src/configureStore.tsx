/**
 * Create the store with dynamic reducers
 */

import {createStore, applyMiddleware, compose} from "redux"
import {fromJS} from "immutable"
const {routerMiddleware} = require("react-router-redux")
import thunk from "redux-thunk"
import createReducer from "./reducers"
import {loadState} from "./localStorage"

export default function configureStore(initialState = {}, history: any) {
  const persistedState = loadState()

  const middlewares = [thunk, routerMiddleware(history)]

  const enhancers = [applyMiddleware(...middlewares)]

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose
  /* eslint-enable */

  const store = createStore(
    createReducer(undefined),
    persistedState || fromJS(initialState),
    composeEnhancers(...enhancers)
  )

  // Extensions
  store.injectedReducers = {} // Reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if ((module as any).hot) {
    ;(module as any).hot.accept("./reducers", () => {
      store.replaceReducer(createReducer(store.injectedReducers))
    })
  }

  return store
}
