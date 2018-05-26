/*
 * User reducer
 */
import {fromJS} from "immutable"

import {ActionType, UserStatus} from "./constants"
import {AnyAction} from "redux"

const initialState = fromJS({
  userState: UserStatus.ANONYMOUS,
  registration: {
    inviterToken: "",
    registrationStep: 0,
    codeSent: null,
    isPhonePending: false,
    isCodePending: false,
    isLoginPending: false,
    phone: "",
  },
  userInfo: {},
})

const userSessionReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.CHANGE_USER_STATE:
      return state.set("userState", fromJS(action.payload))
    case ActionType.SET_INVITER_TOKEN: {
      const registration = state.get("registration").toJS()
      registration.inviterToken = action.payload
      return state.set("registration", fromJS(registration))
    }
    case ActionType.UPDATE_USER_INFORMATION:
      return state.set("userInfo", fromJS(action.payload))
    case ActionType.SET_PHONE: {
      const registration = state.get("registration").toJS()
      registration.phone = action.payload.phone
      registration.codeSent = action.payload.codeSent
      if (action.payload.registrationStep !== undefined) {
        registration.registrationStep = action.payload.registrationStep
      }
      return state.set("registration", fromJS(registration))
    }
    case ActionType.CHANGE_PHONE_PENDING_STATE: {
      const registration = state.get("registration").toJS()
      registration.isPhonePending = action.payload
      return state.set("registration", fromJS(registration))
    }
    case ActionType.CHANGE_CODE_PENDING_STATE: {
      const registration = state.get("registration").toJS()
      registration.isCodePending = action.payload
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
