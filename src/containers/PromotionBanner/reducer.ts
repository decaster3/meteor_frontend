/*
 * User reducer
 */

import {fromJS} from "immutable"

import {ActionType} from "./constants"
import {Status} from "../../constants"
import {AnyAction} from "redux"

const initialState = fromJS({
  banners: [],
  bannersStatus: Status.NOT_LOADED,
})

const promotionBannersReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.SET_BANNERS:
      return state.set("banners", fromJS(action.payload))
    case ActionType.SET_BANNERS_STATUS:
      return state.set("bannersStatus", fromJS(action.payload))
    default:
      return state
  }
}

export default promotionBannersReducer
