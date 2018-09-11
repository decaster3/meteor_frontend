import {fromJS} from "immutable"

import {ActionType} from "./constants"
import {Status, citiesData} from "../../constants"
import {AnyAction} from "redux"

const initialState = fromJS({
  cities: citiesData,
  citiesStatus: Status.LOADED,
  determinedCity: null,
  isCityChoosen: false,
  determinedCityStatus: Status.NOT_LOADED,
  isNavigationAllowed: false,
  defaultCity: citiesData[0],
  isDeliveryAvailable: false,
})

const GeoReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.SET_DETERMINED_CITY:
      return state.set("determinedCity", fromJS(action.payload))
    case ActionType.CHANGE_AVAILABLE_TIME_STATUS:
      return state.set("isDeliveryAvailable", fromJS(action.payload))
    case ActionType.SET_DEFAULT_CITY:
      const currentState = state.toJS()
      currentState.defaultCity = action.payload
      currentState.isCityChoosen = true
      return fromJS(currentState)
    case ActionType.CHANGE_NAVIGATION_STATUS:
      return state.set("isNavigationAllowed", fromJS(action.payload))
    case ActionType.SET_DETERMINED_CITY_STATUS:
      return state.set("determinedCityStatus", fromJS(action.payload))
    default:
      return state
  }
}

export default GeoReducer
