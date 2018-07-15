/*
 * User reducer
 */

import {fromJS} from "immutable"

import {ActionType} from "./constants"
import {Status} from "../../constants"
import {AnyAction} from "redux"

const initialState = fromJS({
  categories: [],
  categoriesStatus: Status.NOT_LOADED,
})

const menuReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.SET_CATEGORIES:
      return state.set("categories", fromJS(action.payload))
    case ActionType.SET_CATEGORIES_STATUS:
      return state.set("categoriesStatus", fromJS(action.payload))
    default:
      return state
  }
}

export default menuReducer
