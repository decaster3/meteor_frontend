/*
 *
 * User reducer
 *
 */

import {fromJS} from "immutable"

import {Action} from "./constants"
import {Status} from "../../constants"

const initialState = fromJS({
  citiesState: Status.NOT_LOADED,
  cities: [],
  categoriesState: Status.NOT_LOADED,
  categories: [],
})

const LayoutReducer = (
  state = initialState,
  action: {payload: object; type: string}
) => {
  switch (action.type) {
    case Action.SET_CATEGORIES:
      return state.set("categories", fromJS(action.payload))
    case Action.SET_CITIES:
      return state.set("cities", fromJS(action.payload))
    case Action.SET_CATEGORIES_STATE:
      return state.set("categoriesState", fromJS(action.payload))
    case Action.SET_CITIES_STATE:
      return state.set("citiesState", fromJS(action.payload))
    default:
      return state
  }
}

export default LayoutReducer
