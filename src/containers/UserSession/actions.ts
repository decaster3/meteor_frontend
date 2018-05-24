/*
 * User actions
 */
import {Dispatch} from "redux"
import {State} from "../../"
import requests from "../../services/requests"
import {ActionType, UserStatus} from "./constants"
import * as moment from "moment"

export interface User {
  id: number
  email: string
  phone: string
  role: string
}
const later = (delay: number) =>
  new Promise(resolve => {
    setTimeout(resolve, delay)
  })

const nextRegistrationStep = () => ({type: ActionType.NEXT_REGISTRATION_STEP})
const previousRegistrationStep = () => ({
  type: ActionType.PREVIOUS_REGISTRATION_STEP,
})

const changeUserStatus = (userStatus: UserStatus) => ({
  type: ActionType.CHANGE_USER_STATE,
  payload: userStatus,
})

const setUserInfo = (userInfo: User) => ({
  type: ActionType.UPDATE_USER_INFORMATION,
  payload: userInfo,
})

export const login = (credentials: {
  email: string
  password: string
  phone: string
}) => (dispatch: Dispatch<State>) => {
  dispatch(changeUserStatus(UserStatus.LOGGING_IN))
  requests
    .post("auth/sign_in", {body: {user: credentials}})
    .then(data => {
      dispatch(changeUserStatus(UserStatus.LOGED_IN))
      dispatch(setUserInfo(data))
    })
    .catch(() => dispatch(changeUserStatus(UserStatus.ANONYMOUS)))
}

export const logout = () => (dispatch: Dispatch<State>) => {
  dispatch(changeUserStatus(UserStatus.LOGGING_IN))
  requests.delete("auth/sign_in").then(() => {
    dispatch(changeUserStatus(UserStatus.ANONYMOUS))
  })
}

export const sendPhone = (params: {phone: string}) => (
  dispatch: Dispatch<State>
) => {
  later(5000).then(() => {
    dispatch({
      type: ActionType.SET_PHONE,
      payload: {
        phone: params.phone,
        codeSent: moment(),
      },
    })
    dispatch(nextRegistrationStep())
    console.log(params)
  })
}

export const sendCode = (params: {code: string}) => (
  dispatch: Dispatch<State>
) => {
  later(5000).then(() => {
    dispatch(nextRegistrationStep())
    console.log(params)
  })
}

export const reSendPhone = () => (dispatch: Dispatch<State>) => {
  dispatch(previousRegistrationStep())
  dispatch({
    type: ActionType.SET_PHONE,
    payload: {
      phone: null,
      codeSent: null,
    },
  })
}
