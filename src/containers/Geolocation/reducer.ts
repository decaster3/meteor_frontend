/*
 * User reducer
 */

import {fromJS} from "immutable"

import {ActionType} from "./constants"
import {Status} from "../../constants"
import {AnyAction} from "redux"

const initialState = fromJS({
  citiesStatus: Status.NOT_LOADED,
  cities: [],
  determinedCity: null,
  determinedCityStatus: Status.NOT_LOADED,
  isNavigationAllowed: false,
  defaultCity: null,
})

const LayoutReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.SET_CITIES:
      return state.set("cities", fromJS(action.payload))
    case ActionType.SET_CITIES_STATUS:
      return state.set("citiesStatus", fromJS(action.payload))
    case ActionType.SET_DETERMINED_CITY:
      return state.set("determinedCity", fromJS(action.payload))
    case ActionType.SET_DEFAULT_CITY:
      return state.set("defaultCity", fromJS(action.payload))
    case ActionType.CHANGE_NAVIGATION_STATUS:
      return state.set("isNavigationAllowed", fromJS(action.payload))
    case ActionType.SET_DETERMINED_CITY_STATUS:
      return state.set("determinedCityStatus", fromJS(action.payload))
    default:
      return state
  }
}

export default LayoutReducer
