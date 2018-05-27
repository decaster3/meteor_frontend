/*
 * User actions
 */
import {formatNumber} from "libphonenumber-js"
import {SubmissionError} from "redux-form/immutable"
import {Dispatch} from "redux"
import {State} from "../../"
import requests from "../../services/requests"
import {ActionType, UserState} from "./constants"
import * as moment from "moment"

export interface User {
  id: number
  phone: string
  role: string
  name: string
}

const nextRegistrationStep = () => ({type: ActionType.NEXT_REGISTRATION_STEP})

const previousRegistrationStep = () => ({
  type: ActionType.PREVIOUS_REGISTRATION_STEP,
})

const changePhonePendingState = (state: boolean) => ({
  type: ActionType.CHANGE_PHONE_PENDING_STATE,
  payload: state,
})

const changeLoginPendingState = (state: boolean) => ({
  type: ActionType.CHANGE_LOGIN_PENDING_STATE,
  payload: state,
})

const changeCodePendingState = (state: boolean) => ({
  type: ActionType.CHANGE_CODE_PENDING_STATE,
  payload: state,
})

const changeUserStatus = (userStatus: UserState) => ({
  type: ActionType.CHANGE_USER_STATE,
  payload: userStatus,
})

const setUserInfo = (userInfo: User) => ({
  type: ActionType.UPDATE_USER_INFORMATION,
  payload: userInfo,
})

export const setInviterToken = (inviterToken: string) => ({
  type: ActionType.SET_INVITER_TOKEN,
  payload: inviterToken,
})

export const login = (password: string, phone: string) => (
  dispatch: Dispatch<State>
) => {
  dispatch(changeLoginPendingState(true))
  dispatch(changeUserStatus(UserState.LOGGING_IN))
  return requests
    .post("auth/sign_in", {body: {user: phone, password}})
    .then(data => {
      dispatch(changeLoginPendingState(false))
      dispatch(changeUserStatus(UserState.LOGED_IN))
      dispatch(setUserInfo(data))
    })
    .catch(err => {
      dispatch(changeUserStatus(UserState.ANONYMOUS))
      dispatch(changeLoginPendingState(false))
      if (err.msg) {
        throw new SubmissionError({_error: "Неправильный формат данных"})
      }
    })
}

export const logout = () => (dispatch: Dispatch<State>) => {
  dispatch(changeUserStatus(UserState.LOGGING_IN))
  requests.delete("auth/sign_in").then(() => {
    dispatch(changeUserStatus(UserState.ANONYMOUS))
  })
}

export const signUp = (
  inviterToken: string,
  name: string,
  phone: string,
  password: string,
  passwordConfirmation: string
) => (dispatch: Dispatch<State>) => {
  dispatch(changePhonePendingState(true))
  const user = inviterToken
    ? {
        phone: formatNumber(phone, "E.164"),
        password,
        name,
        passwordConfirmation,
        inviterToken,
      }
    : {
        phone: formatNumber(phone, "E.164"),
        password,
        name,
        passwordConfirmation,
      }
  return requests
    .post("auth", {
      body: {
        user,
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
    .catch(err => {
      dispatch(changePhonePendingState(false))
      if (err.status === 422) {
        if (err.body.error === "Invalid token.") {
          dispatch(setInviterToken(""))
          throw new SubmissionError({_error: err.body.error})
        }
        throw new SubmissionError({_error: "Неправильный формат"})
      }
    })
}

export const sendCode = (code: string) => (dispatch: Dispatch<State>) => {
  dispatch(changeCodePendingState(true))
  return requests
    .get(`confirmation?confirmation_code=${code}`)
    .then(data => {
      dispatch(changeUserStatus(UserState.LOGED_IN))
      dispatch(setUserInfo(data))
      dispatch(changeCodePendingState(false))
    })
    .catch(err => {
      dispatch(changeCodePendingState(false))
      if (err.msg) {
        throw new SubmissionError({_error: "Неправильный формат"})
      }
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
