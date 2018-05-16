/*
 *
 * User reducer
 *
 */

import {fromJS} from "immutable"

import {ActionType} from "./constants"
import {Status} from "../../constants"
import {AnyAction} from "redux"

const initialState = fromJS({
  citiesState: Status.NOT_LOADED,
  cities: [],
  categoriesState: Status.NOT_LOADED,
  categories: [],
})

const LayoutReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.SET_CATEGORIES:
      return state.set("categories", fromJS(action.payload))
    case ActionType.SET_CITIES:
      return state.set("cities", fromJS(action.payload))
    case ActionType.SET_CATEGORIES_STATE:
      return state.set("categoriesState", fromJS(action.payload))
    case ActionType.SET_CITIES_STATE:
      return state.set("citiesState", fromJS(action.payload))
    default:
      return state
  }
}

export default LayoutReducer
