import * as invariant from "invariant"
import {isEmpty, isFunction, isString} from "lodash"
import createReducer from "../reducers"
import checkStore from "./checkStore"

export const injectReducerFactory = (store: any, isValid: any) => (
  key: any,
  reducer: any
) => {
  if (!isValid) {
    checkStore(store)
  }

  invariant(
    isString(key) && !isEmpty(key) && isFunction(reducer),
    "(app/utils...) injectReducer: Expected `reducer` to be a reducer function"
  )

  // Check `store.injectedReducers[key] === reducer` for hot reloading
  // when a key is the same but a reducer is different
  if (
    Reflect.has(store.injectedReducers, key) &&
    store.injectedReducers[key] === reducer
  ) {
    return
  }

  store.injectedReducers[key] = reducer // eslint-disable-line no-param-reassign
  store.replaceReducer(createReducer(store.injectedReducers))
}

export const getInjectors = (store: any) => {
  checkStore(store)

  return {
    injectReducer: injectReducerFactory(store, true),
  }
}

export default getInjectors
