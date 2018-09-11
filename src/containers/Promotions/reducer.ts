import {fromJS} from "immutable"
import {ActionType} from "./constants"
import {Status} from "../../constants"
import {AnyAction} from "redux"

const initialState = fromJS({
  promotions: null,
  isLoading: false,
  error: null,
})

const promotionReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.SET_PROMOTIONS:
      return state.set("promotions", fromJS(action.payload))
    case ActionType.SET_ERROR:
      return state.set("error", fromJS(action.payload))
    case ActionType.SET_PROMOTIONS_STATUS:
      return state.set("isLoading", fromJS(action.payload))
    default:
      return state
  }
}

export default promotionReducer
