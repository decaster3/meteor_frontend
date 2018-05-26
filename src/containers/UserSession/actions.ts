/*
 * User actions
 */
import {formatNumber} from "libphonenumber-js"

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

const changePhonePendingState = (state: boolean) => ({
  type: ActionType.CHANGE_PHONE_PENDING_STATE,
  payload: state,
})

const changeCodePendingState = (state: boolean) => ({
  type: ActionType.CHANGE_CODE_PENDING_STATE,
  payload: state,
})

const changeUserStatus = (userStatus: UserStatus) => ({
  type: ActionType.CHANGE_USER_STATE,
  payload: userStatus,
})

const setUserInfo = (userInfo: User) => ({
  type: ActionType.UPDATE_USER_INFORMATION,
  payload: userInfo,
})

export const login = (password: string, phone: string) => (
  dispatch: Dispatch<State>
) => {
  console.log(password, phone)
  dispatch(changeUserStatus(UserStatus.LOGGING_IN))
  requests
    .post("auth/sign_in", {body: {user: phone, password}})
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

export const signUp = (
  phone: string,
  password: string,
  passwordConfirmation: string
) => (dispatch: Dispatch<State>) => {
  dispatch(changePhonePendingState(true))
  requests
    .post("auth", {
      body: {
        user: {
          phone: formatNumber(phone, "E.164"),
          password,
          passwordConfirmation,
        },
      },
    })
    .then(() => {
      dispatch({
        type: ActionType.SET_PHONE,
        payload: {
          phone,
          codeSent: moment(),
        },
      })
      dispatch(nextRegistrationStep())
      dispatch(changePhonePendingState(false))
    })
    .catch(() => {
      dispatch(changePhonePendingState(false))
    })
}

export const sendCode = (code: string) => (dispatch: Dispatch<State>) => {
  dispatch(changeCodePendingState(true))
  requests
    .get(`confirmation?confirmation_code=${code}`)
    .then(() => {
      dispatch(nextRegistrationStep())
      dispatch(changeCodePendingState(false))
    })
    .catch(() => {
      dispatch(changeCodePendingState(false))
    })
}

export const reSendPhone = () => (dispatch: Dispatch<State>) => {
  dispatch(previousRegistrationStep())
  dispatch({
    type: ActionType.SET_PHONE,
    payload: {
      phone: null,
      codeSent: null,
      registrationStep: 0,
    },
  })
}
