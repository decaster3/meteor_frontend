/*
 * User
 */
import * as React from "react"
import {connect} from "react-redux"
import {compose, Dispatch} from "redux"
import {State} from "../../"
import injectReducer from "../../utils/injectReducer"
import {login, logout, signUp, reSendPhone, sendCode} from "./actions"
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
} from "./selectors"
import AuthWrapper from "../../views/AuthWrapper"

interface UserSessionProps {
  phone: string
  inviterToken: string
  registrationFirst?: boolean
  codeSent: string
  userState: string
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
}
export class UserSession extends React.Component<UserSessionProps> {
  render() {
    return (
      <AuthWrapper
        login={this.props.login}
        reSendPhone={this.props.reSendPhone}
        signUp={this.props.signUp}
        sendCode={this.props.sendCode}
        regsitrationStep={this.props.regsitrationStep}
        codeSent={this.props.codeSent}
        isPhonePending={this.props.isPhonePending}
        phone={this.props.phone}
        isCodePending={this.props.isCodePending}
        isLoginPending={this.props.isLoginPending}
        inviterToken={this.props.inviterToken}
        registrationFirst={this.props.registrationFirst}
      >
        {this.props.children}
      </AuthWrapper>
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    userState: selectUserState(state),
    regsitrationStep: selectUserRegistrationStep(state),
    codeSent: selectCodeSentTime(state),
    isPhonePending: selectIsPhonePending(state),
    isCodePending: selectIsCodePending(state),
    isLoginPending: selectIsLoginPending(state),
    phone: selectPhone(state),
    inviterToken: selectInviterToken(state),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (password: string, phone: string) =>
      dispatch(login(password, phone)),
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
    logout: () => dispatch(logout()),
    reSendPhone: () => dispatch(reSendPhone()),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({key: "userSession", reducer})

export default compose(withReducer, withConnect)(UserSession)
