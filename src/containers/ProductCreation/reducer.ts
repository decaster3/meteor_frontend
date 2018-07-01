/*
 * User reducer
 */

import {fromJS} from "immutable"

import {ActionType} from "./constants"
import {AnyAction} from "redux"

const initialState = fromJS({
  isProductCreating: false,
})

const productCreationReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.CHANGE_PRODUCT_CREATION_STATUS:
      return state.set("isProductCreating", fromJS(action.payload))
    default:
      return state
  }
}

export default productCreationReducer
