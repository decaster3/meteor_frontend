/*
 * User actions
 */
import {formatNumber} from "libphonenumber-js"
// tslint:disable-next-line:no-submodule-imports
import {SubmissionError} from "redux-form/immutable"
import {Dispatch} from "redux"
import {State} from "../../"
import requests from "../../services/requests"
import {ActionType, UserState} from "./constants"
import moment from "moment"
import {Status} from "../../constants"

export interface UserInformation {
  id: number
  phone: string
  role: string
  name: string
  token: string
  meteors: Meteor[]
  userInfoStatus: string
}
export interface Meteor {
  id: number
  value: number
  description: string
}
const changeUserInfoStatus = (status: string) => ({
  type: ActionType.UPDATE_USER_INFORMATION_STATUS,
  payload: status,
})
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

const setUserInfo = (userInfo: UserInformation) => ({
  type: ActionType.UPDATE_USER_INFORMATION,
  payload: userInfo,
})

export const setInviterToken = (inviterToken: string) => ({
  type: ActionType.SET_INVITER_TOKEN,
  payload: inviterToken,
})
export const getUserInfo = () => (dispatch: Dispatch<State>) => {
  dispatch(changeUserInfoStatus(Status.LOADING))
  return requests
    .get("users")
    .then(data => {
      dispatch(setUserInfo(data))
      dispatch(changeUserInfoStatus(Status.LOADED))
    })
    .catch(err => dispatch(changeUserInfoStatus(Status.LOADING_ERROR)))
}

export const login = (password: string, phone: string) => (
  dispatch: Dispatch<State>
) => {
  dispatch(changeLoginPendingState(true))
  dispatch(changeUserStatus(UserState.LOGGING_IN))
  return requests
    .post("auth/sign_in", {
      body: {user: {phone: phone.replace(/\s/g, ""), password}},
    })
    .then(data => {
      dispatch(changeLoginPendingState(false))
      dispatch(changeUserStatus(UserState.LOGED_IN))
      dispatch(setUserInfo(data))
    })
    .catch(err => {
      dispatch(changeUserStatus(UserState.ANONYMOUS))
      dispatch(changeLoginPendingState(false))
      if (err.body.error === "Invalid Phone or password.") {
        throw new SubmissionError({_error: "Неправильный телефон или пароль"})
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
        phone: phone.replace(/\s/g, ""),
        password,
        name,
        passwordConfirmation,
        inviterToken,
      }
    : {
        phone: phone.replace(/\s/g, ""),
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
