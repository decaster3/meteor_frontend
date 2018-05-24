/*
 * User reducer
 */

import {fromJS} from "immutable"

import {ActionType, UserStatus} from "./constants"
import {AnyAction} from "redux"

const initialState = fromJS({
  userState: UserStatus.ANONYMOUS,
  registration: {
    registrationStep: 0,
    codeSent: null,
    // phoneStatus:
    phone: null,
  },
  userInfo: {},
})

const userSessionReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.CHANGE_USER_STATE:
      return state.set("userState", fromJS(action.payload))
    case ActionType.UPDATE_USER_INFORMATION:
      return state.set("userInfo", fromJS(action.payload))
    case ActionType.SET_PHONE: {
      const registration = state.get("registration").toJS()
      registration.phone = action.payload.phone
      registration.codeSent = action.payload.codeSent
      return state.set("registration", fromJS(registration))
    }
    case ActionType.NEXT_REGISTRATION_STEP: {
      const registration = state.get("registration").toJS()
      registration.registrationStep += 1
      return state.set("registration", fromJS(registration))
    }
    case ActionType.PREVIOUS_REGISTRATION_STEP: {
      const registration = state.get("registration").toJS()
      registration.registrationStep -= 1
      return state.set("registration", fromJS(registration))
    }
    default:
      return state
  }
}

export default userSessionReducer
