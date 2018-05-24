/*
 * User
 */
import * as React from "react"
import {connect} from "react-redux"
import {compose, Dispatch} from "redux"
import {State} from "../../"
import injectReducer from "../../utils/injectReducer"
import {login, logout, sendPhone, reSendPhone, sendCode} from "./actions"
import reducer from "./reducer"
import {
  selectUserState,
  selectUserRegistrationStep,
  selectCodeSentTime,
  selectIsPhonePending,
  selectIsCodePending,
  selectPhone,
} from "./selectors"
import LoginAndSignup from "../../views/SignupAndLogin"

interface UserSessionProps {
  phone: string
  codeSent: string
  userState: string
  regsitrationStep: number
  isPhonePending: boolean
  isCodePending: boolean
  login(params: {password: string; phone: string}): void
  sendPhone(params: {phone: string}): void
  sendCode(params: {code: string}): void
  logout(): void
  reSendPhone(): void
}
export class UserSession extends React.Component<UserSessionProps> {
  render() {
    return (
      <LoginAndSignup
        login={this.props.login}
        reSendPhone={this.props.reSendPhone}
        sendPhone={this.props.sendPhone}
        sendCode={this.props.sendCode}
        regsitrationStep={this.props.regsitrationStep}
        codeSent={this.props.codeSent}
        isPhonePending={this.props.isPhonePending}
        phone={this.props.phone}
        isCodePending={this.props.isCodePending}
      />
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
    phone: selectPhone(state),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (params: {email: string; password: string; phone: string}) =>
      dispatch(login(params)),
    sendPhone: (phone: string) => dispatch(sendPhone(phone)),
    sendCode: (code: string) => dispatch(sendCode(code)),
    logout: () => dispatch(logout()),
    reSendPhone: () => dispatch(reSendPhone()),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({key: "userSession", reducer})

export default compose(withReducer, withConnect)(UserSession)
