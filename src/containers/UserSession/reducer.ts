/*
 * User reducer
 */

import {fromJS} from "immutable"

import {Action, UserStatus} from "./constants"

const initialState = fromJS({
  userState: UserStatus.ANONYMOUS,
  userInformation: {
    registrationStep: 0,
  },
})

const userSessionReducer = (
  state = initialState,
  action: {payload: object; type: string}
) => {
  switch (action.type) {
    case Action.CHANGE_USER_STATE:
      return state.set("userState", fromJS(action.payload))
    case Action.UPDATE_USER_INFORMATION:
      return state.set("userInformation", fromJS(action.payload))
    case Action.NEXT_REGISTRATION_STEP: {
      const userInfo = state.get("userInformation").toJS()
      userInfo.registrationStep += 1
      return state.set("userInformation", fromJS(userInfo))
    }
    default:
      return state
  }
}

export default userSessionReducer
