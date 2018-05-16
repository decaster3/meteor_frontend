/*
 *
 * User actions
 *
 */
import {Dispatch} from "redux"
import {State} from "../../"
import Requests from "../../services/Requests"
import C from "./constants"

export interface User {
  email: string
  phone: string
  id: number
  role: string
}

const nextRegistrationStep = () => ({type: C.NEXT_REGISTRATION_STEP})

const changeUserState = (userState: string) => ({
  payload: userState,
  type: C.CHANGE_USER_STATE,
})

const setUserInformation = (userInfo: User) => ({
  type: C.UPDATE_USER_INFORMATION,
  payload: userInfo,
})

export const login = (credentials: {
  email: string
  password: string
  phone: string
}) => (dispatch: Dispatch<State>) => {
  dispatch(changeUserState(C.LOGGING_IN))
  Requests.post("auth/sign_in", {body: {user: credentials}})
    .then(data => {
      dispatch(changeUserState(C.LOGED_IN))
      dispatch(setUserInformation(data))
    })
    .catch(() => dispatch(changeUserState(C.ANONYMOUS)))
}

export const logout = () => (dispatch: Dispatch<State>) => {
  Requests.delete("auth/sign_out").then(() => {
    dispatch(changeUserState(C.ANONYMOUS))
  })
}
