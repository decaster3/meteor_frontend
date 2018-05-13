import * as invariant from "invariant"
import {conformsTo, isFunction, isObject} from "lodash"

/**
 * Validate the shape of redux store
 */
export default function checkStore(store: any) {
  const shape = {
    dispatch: isFunction,
    getState: isFunction,
    injectedReducers: isObject,
    replaceReducer: isFunction,
    subscribe: isFunction,
  }

  invariant(
    conformsTo(store, shape),
    `(app/utils...) injectors: Expected a valid redux store: ${store}`
  )
}
