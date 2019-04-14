import {fromJS} from "immutable"

import {ActionType} from "./constants"
import {Status, citiesData} from "../../constants"
import {AnyAction} from "redux"

const initialState = fromJS({
  cities: citiesData,
  defaultCity: citiesData[0],
  isDeliveryAvailable: false,
})

const GeoReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.CHANGE_AVAILABLE_TIME_STATUS:
      return state.set("isDeliveryAvailable", fromJS(action.payload))
    case ActionType.SET_DEFAULT_CITY:
      const currentState = state.toJS()
      currentState.defaultCity = action.payload
      currentState.isCityChoosen = true
      return fromJS(currentState)
    default:
      return state
  }
}

export default GeoReducer
