import * as invariant from "invariant"
import {isEmpty, isFunction, isString} from "lodash"
import {Store} from "redux"
// import {combineReducers} from "redux /-immutable"
import {createReducer} from "../reducers"
import checkStore from "./checkStore"

export const injectReducerFactory = (store: Store<any>, isValid: any) => (
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
    // @ts-ignore
    Reflect.has(store.injectedReducers, key) &&
    // @ts-ignore
    store.injectedReducers[key] === reducer
  ) {
    return
  }

  // @ts-ignore
  store.injectedReducers[key] = reducer
  // @ts-ignore
  store.replaceReducer(createReducer(store.injectedReducers))
}

export const getInjectors = (store: any) => {
  checkStore(store)

  return {
    injectReducer: injectReducerFactory(store, true),
  }
}

export default getInjectors
