import {fromJS} from "immutable"
import {ActionType} from "./constants"
import {Status} from "../../constants"
import {AnyAction} from "redux"

const initialState = fromJS({
  promotions: [],
  promotionsStatus: Status.NOT_LOADED,
})

const promotionReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.SET_PROMOTIONS:
      return state.set("promotions", fromJS(action.payload))
    case ActionType.SET_PROMOTIONS_STATUS:
      return state.set("promotionsStatus", fromJS(action.payload))
    default:
      return state
  }
}

export default promotionReducer
