import invariant from "invariant"
import * as conformsTo from "lodash/conformsTo"
import isFunction from "lodash/isFunction"
import * as isObject from "lodash/isObject"

/**
 * Validate the shape of redux store
 */
export default function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    getState: isFunction,
    injectedReducers: isObject,
    replaceReducer: isFunction,
    subscribe: isFunction,
  }
  invariant(
    conformsTo(store, shape),
    "(app/utils...) injectors: Expected a valid redux store"
  )
}
