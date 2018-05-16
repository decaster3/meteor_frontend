/*
 *
 * User reducer
 *
 */

import {fromJS} from "immutable"

import {AC, SC} from "./constants"

const initialState = fromJS({
  citiesState: SC.NOT_LOADED,
  cities: [],
  categoriesState: SC.NOT_LOADED,
  categories: [],
})

const LayoutReducer = (
  state = initialState,
  action: {payload: object; type: string}
) => {
  switch (action.type) {
    case AC.SET_CATEGORIES:
      return state.set("categories", fromJS(action.payload))
    case AC.SET_CITIES:
      return state.set("cities", fromJS(action.payload))
    case AC.SET_CATEGORIES_STATE:
      return state.set("categoriesState", fromJS(action.payload))
    case AC.SET_CITIES_STATE:
      return state.set("citiesState", fromJS(action.payload))
    default:
      return state
  }
}

export default LayoutReducer
