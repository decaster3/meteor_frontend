import {fromJS} from "immutable"
import {ActionType, OrderStatus} from "./constants"
import {Status} from "../../constants"
import {AnyAction} from "redux"

const initialState = fromJS({
  streets: [],
  streetsStatus: Status.NOT_LOADED,
  orderStatus: OrderStatus.NOT_DONE,
})
const checkoutReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.SET_STREETS:
      return state.set("streets", fromJS(action.payload))
    case ActionType.CHANGE_ORDER_STATUS:
      return state.set("orderStatus", fromJS(action.payload))
    case ActionType.CHANGE_STREETS_STATUS:
      return state.set("streetsStatus", fromJS(action.payload))
    default:
      return state
  }
}

export default checkoutReducer
