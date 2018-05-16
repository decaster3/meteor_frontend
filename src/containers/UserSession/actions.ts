/*
 * User actions
 */
import {Dispatch} from "redux"
import {State} from "../../"
import Requests from "../../services/requests"
import {Action, UserStatus} from "./constants"

export interface User {
  email: string
  phone: string
  id: number
  role: string
}

const nextRegistrationStep = () => ({type: Action.NEXT_REGISTRATION_STEP})

const changeUserStatus = (userStatus: UserStatus) => ({
  type: Action.CHANGE_USER_STATE,
  payload: userStatus,
})

const setUserInfo = (userInfo: User) => ({
  type: Action.UPDATE_USER_INFORMATION,
  payload: userInfo,
})

export const login = (credentials: {
  email: string
  password: string
  phone: string
}) => (dispatch: Dispatch<State>) => {
  dispatch(changeUserStatus(UserStatus.LOGGING_IN))
  Requests.post("auth/sign_in", {body: {user: credentials}})
    .then(data => {
      dispatch(changeUserStatus(UserStatus.LOGED_IN))
      dispatch(setUserInfo(data))
    })
    .catch(() => dispatch(changeUserStatus(UserStatus.ANONYMOUS)))
}

export const logout = () => (dispatch: Dispatch<State>) => {
  dispatch(changeUserStatus(UserStatus.LOGGING_IN))
  Requests.delete("auth/sign_in").then(() => {
    dispatch(changeUserStatus(UserStatus.ANONYMOUS))
  })
}
