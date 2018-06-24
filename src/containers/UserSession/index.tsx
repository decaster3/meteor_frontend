/*
 * User
 */
import * as React from "react"
import {connect} from "react-redux"
import {compose, Dispatch} from "redux"
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
import AuthWrapper from "../../views/AuthWrapper"

interface UserSessionProps {
  phone: string
  inviterToken: string
  registrationFirst?: boolean
  codeSent: string
  userState: string
  userInfo: UserInformation
  regsitrationStep: number
  isLoginPending: boolean
  isPhonePending: boolean
  isCodePending: boolean
  login(password: string, phone: string): void
  signUp(
    inviterToken: string,
    name: string,
    phone: string,
    password: string,
    passwordConfirmation: string
  ): void
  sendCode(params: {code: string}): void
  logout(): void
  reSendPhone(): void
  setInviterToken(token: string): void
  getUserInfo(token: string): void
}

const WithRegistration = (WrappedComponent: React.ComponentType) => {
  return class WithRegistrationContainer extends React.Component<
    UserSessionProps
  > {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

const WithUser = (WrappedComponent: React.ComponentType) => {
  return class WithUserContainer extends React.Component<UserSessionProps> {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

const mapStateToPropsUser = (state: State) => {
  return {
    userState: selectUserState(state),
    userInfo: selectUserInfo(state),
  }
}

const mapStateToPropsRegistration = (state: State) => {
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

const mapDispatchToPropsSessionControl = (dispatch: any) => {
  return {
    login: (password: string, phone: string) =>
      dispatch(login(password, phone)),
    logout: () => dispatch(logout()),
    getUserInfo: () => dispatch(getUserInfo()),
  }
}

const mapDispatchToPropsRegistration = (dispatch: any) => {
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
  WithRegistration,
  connect(
    mapStateToPropsRegistration,
    mapDispatchToPropsRegistration
  )
)

export const withUser = compose(
  withReducer,
  WithUser,
  connect(
    mapStateToPropsUser,
    mapDispatchToPropsSessionControl
  )
)
