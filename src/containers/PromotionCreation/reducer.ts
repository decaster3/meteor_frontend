import {fromJS} from "immutable"

import {ActionType} from "./constants"
import {AnyAction} from "redux"

const initialState = fromJS({
  isPromotionCreating: false,
})

const promotionCreationReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.CHANGE_PROMOTION_CREATION_STATUS:
      return state.set("isPromotionCreating", fromJS(action.payload))
    default:
      return state
  }
}

export default promotionCreationReducer
