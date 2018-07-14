/*
 * User
 */
import {connect} from "react-redux"
import {compose} from "redux"
import {State} from "../../"
import injectReducer from "../../utils/injectReducer"
import {
  login,
  logout,
  getUserInfo,
  signUp,
  reSendPhone,
  sendCode,
  setInviterToken,
  UserInformation,
} from "./actions"
import reducer from "./reducer"
import {
  selectUserState,
  selectUserRegistrationStep,
  selectCodeSentTime,
  selectIsPhonePending,
  selectIsCodePending,
  selectPhone,
  selectIsLoginPending,
  selectInviterToken,
  selectUserInfo,
} from "./selectors"

export interface UserStateProps {
  userState: string
  userInfo: UserInformation
}

const mapStateToUserProps = (state: State): UserStateProps => {
  return {
    userState: selectUserState(state),
    userInfo: selectUserInfo(state),
  }
}

export interface RegistrationStateProps {
  phone: string
  inviterToken: string
  codeSent: string
  regsitrationStep: number
  isLoginPending: boolean
  isPhonePending: boolean
  isCodePending: boolean
}

const mapStateToRegistrationProps = (state: State): RegistrationStateProps => {
  return {
    regsitrationStep: selectUserRegistrationStep(state),
    codeSent: selectCodeSentTime(state),
    isPhonePending: selectIsPhonePending(state),
    isCodePending: selectIsCodePending(state),
    isLoginPending: selectIsLoginPending(state),
    phone: selectPhone(state),
    inviterToken: selectInviterToken(state),
  }
}

export interface UserDispatchProps {
  login(password: string, phone: string): void
  logout(): void
  getUserInfo(token: string): void
}

const mapDispatchToUserProps = (dispatch: any): UserDispatchProps => {
  return {
    login: (password: string, phone: string) =>
      dispatch(login(password, phone)),
    logout: () => dispatch(logout()),
    getUserInfo: () => dispatch(getUserInfo()),
  }
}

export interface RegistrationDispatchProps {
  signUp(
    inviterToken: string,
    name: string,
    phone: string,
    password: string,
    passwordConfirmation: string
  ): void
  sendCode(code: string): void
  reSendPhone(): void
  setInviterToken(token: string): void
}

const mapDispatchToRegistrationProps = (
  dispatch: any
): RegistrationDispatchProps => {
  return {
    signUp: (
      inviterToken: string,
      name: string,
      phone: string,
      password: string,
      passwordConfirmation: string
    ) =>
      dispatch(
        signUp(inviterToken, name, phone, password, passwordConfirmation)
      ),
    sendCode: (code: string) => dispatch(sendCode(code)),
    reSendPhone: () => dispatch(reSendPhone()),
    setInviterToken: (token: string) => dispatch(setInviterToken(token)),
  }
}

const withReducer = injectReducer({key: "userSession", reducer})

export const withRegistration = compose(
  withReducer,
  connect(
    mapStateToRegistrationProps,
    mapDispatchToRegistrationProps
  )
)

export const withUser = compose(
  withReducer,
  connect(
    mapStateToUserProps,
    mapDispatchToUserProps
  )
)
