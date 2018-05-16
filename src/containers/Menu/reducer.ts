/*
 * User reducer
 */

import {fromJS} from "immutable"

import {ActionType, UserStatus} from "./constants"
import {AnyAction} from "redux"

const initialState = fromJS({
  userState: UserStatus.ANONYMOUS,
  userInfo: {
    registrationStep: 0,
  },
})

const userSessionReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.CHANGE_USER_STATE:
      return state.set("userState", fromJS(action.payload))
    case ActionType.UPDATE_USER_INFORMATION:
      return state.set("userInfo", fromJS(action.payload))
    case ActionType.NEXT_REGISTRATION_STEP: {
      const userInfo = state.get("userInfo").toJS()
      userInfo.registrationStep += 1
      return state.set("userInfo", fromJS(userInfo))
    }
    default:
      return state
  }
}

export default userSessionReducer
