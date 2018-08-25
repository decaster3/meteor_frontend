import {fromJS} from "immutable"
import {ActionType, UserState} from "./constants"
import {AnyAction} from "redux"
import {Status} from "../../constants"

const initialState = fromJS({
  userState: UserState.ANONYMOUS,
  registration: {
    inviterToken: "",
    registrationStep: 0,
    codeSent: null,
    isPhonePending: false,
    isCodePending: false,
    isLoginPending: false,
    phone: "",
  },
  userInfo: {
    name: "",
    phone: "",
    id: "",
    role: "",
    token: "",
    meteors: [],
    orders: [],
    userInfoStatus: Status.NOT_LOADED,
  },
})

const userSessionReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.CLEAR_USER_SESSION:
      return fromJS(initialState)
    case ActionType.CHANGE_USER_STATE:
      return state.set("userState", fromJS(action.payload))
    case ActionType.SET_INVITER_TOKEN: {
      const registration = state.get("registration").toJS()
      registration.inviterToken = action.payload
      return state.set("registration", fromJS(registration))
    }
    case ActionType.UPDATE_USER_INFORMATION:
      const newUserInformation = {
        ...action.payload,
        userInfoStatus: state.get("userInfo").get("userInfoStatus"),
      }
      return state.set("userInfo", fromJS(newUserInformation))
    case ActionType.UPDATE_USER_INFORMATION_STATUS:
      return state.set(
        "userInfo",
        fromJS({
          ...state.get("userInfo").toJS(),
          userInfoStatus: action.payload,
        })
      )
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
