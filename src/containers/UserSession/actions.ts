import {SubmissionError} from "redux-form/immutable"
import {toast, ToastPosition} from "react-toastify"
import requests from "../../services/requests"
import {ActionType, UserState} from "./constants"
import moment from "moment"
import {Status} from "../../constants"
import {CartProduct} from "../Cart/actions"

export interface UserInfo {
  id: number
  phone: string
  role: string
  name: string
  token: string
  meteors: Meteor[]
  orders: Order[]
  userInfoStatus: string
}

type paymentMethodType = "cash" | "cashless"
type orderStatusType =
  | "not_adopted"
  | "adopted"
  | "ready"
  | "cancelled"
  | "finished"

export const orderStatusTranslation: {[K in orderStatusType]: string} = {
  not_adopted: "Не принят",
  adopted: "Готовится",
  ready: "Доставляется",
  cancelled: "Отменен",
  finished: "Завершен",
}

export const paymentMethodTranslation: {[K in paymentMethodType]: string} = {
  cash: "Наличные",
  cashless: "Карта",
}

export interface Order {
  id: number
  paymentMethod: paymentMethodType
  status: orderStatusType
  createdAt: string
  orderProducts: CartProduct[]
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

const clearSession = () => ({
  type: ActionType.CLEAR_USER_SESSION,
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

const setUserInfo = (userInfo: UserInfo) => ({
  type: ActionType.UPDATE_USER_INFORMATION,
  payload: userInfo,
})

export const setInviterToken = (inviterToken: string) => ({
  type: ActionType.SET_INVITER_TOKEN,
  payload: inviterToken,
})

export const getUserInfo = () => (dispatch: any) => {
  dispatch(changeUserInfoStatus(Status.LOADING))
  return requests
    .get("users")
    .then(data => {
      dispatch(setUserInfo(data))
      dispatch(changeUserInfoStatus(Status.LOADED))
    })
    .catch(err => dispatch(changeUserInfoStatus(Status.LOADING_ERROR)))
}

export const login = (password: string, phone: string) => (dispatch: any) => {
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
      toast.success("🚀🚀🚀 Авторизация прошла успешно!", {
        position: "top-right" as ToastPosition,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      })
    })
    .catch(err => {
      dispatch(changeUserStatus(UserState.ANONYMOUS))
      dispatch(changeLoginPendingState(false))
      if (
        err.body.error === "Invalid Phone or password." &&
        err.body.error === "Invalid segment encoding"
      ) {
        throw new SubmissionError({_error: "Неправильный телефон или пароль"})
      }
      if (err.body.error === "Already registered.") {
        throw new SubmissionError({
          _error: "Пользователь с таким телефоном уже зарегестрирован",
        })
      }
    })
}

export const logout = () => (dispatch: any) => {
  dispatch(changeUserStatus(UserState.ANONYMOUS))
  dispatch(clearSession())
  toast.error("🦄 Сессия устарела, пожалуйста, повторно авторизируйтесь", {
    position: "top-right" as ToastPosition,
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  })
}

export const signUp = (
  inviterToken: string,
  name: string,
  phone: string,
  password: string,
  passwordConfirmation: string
) => (dispatch: any) => {
  dispatch(changePhonePendingState(true))
  const user = {
    phone: phone.replace(/\s/g, ""),
    password,
    name,
    passwordConfirmation,
    ...(inviterToken ? {inviterToken} : {}),
  }
  return requests
    .post("auth", {body: {user}})
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
          throw new SubmissionError({_error: "Неправильной код пригласителя"})
        }
        throw new SubmissionError({_error: "Неправильный формат"})
      }
      if (err.body.error === "Already registered.") {
        throw new SubmissionError({
          _error: "Пользователь с таким телефоном уже зарегестрирован",
        })
      }
    })
}

export const sendCode = (code: string) => (dispatch: any) => {
  dispatch(changeCodePendingState(true))
  return requests
    .get(`confirmation?confirmation_code=${code}`)
    .then(data => {
      dispatch(changeUserStatus(UserState.LOGED_IN))
      dispatch(setUserInfo(data))
      dispatch(changeCodePendingState(false))
      toast.success("🚀🚀🚀 Регистрация прошла успешно!", {
        position: "top-right" as ToastPosition,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      })
    })
    .catch(err => {
      dispatch(changeCodePendingState(false))
      if (err.msg) {
        throw new SubmissionError({_error: "Неправильный формат"})
      }
    })
}

export const reSendPhone = () => (dispatch: any) => {
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
