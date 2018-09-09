import React from "react"

import Login from "./Login"
import SignUp from "./Signup"
import PhoneCode from "./PhoneCode"
import {compose} from "redux"
import {
  withRegistration,
  withUser,
  UserProps,
  RegistrationProps,
} from "../containers/UserSession"
import {UserState} from "../containers/UserSession/constants"
import CustomModal from "./CustomModal"

interface AuthenticationState {
  modalShown: boolean
  isLogin: boolean
}

interface AuthenticationOwnProps {
  registrationFirst: boolean
  modalShown: boolean
  toggle: () => void
}

type AuthenticationProps = UserProps &
  RegistrationProps &
  AuthenticationOwnProps

class Authentication extends React.Component<
  AuthenticationProps,
  AuthenticationState
> {
  static getDerivedStateFromProps(
    nextProps: AuthenticationProps,
    prevState: AuthenticationState
  ) {
    if (
      nextProps.userState === UserState.LOGED_IN &&
      prevState.modalShown === true
    ) {
      return {modalShown: false}
    } else {
      return null
    }
  }

  state: AuthenticationState = {
    isLogin: !this.props.registrationFirst,
    modalShown: false,
  }

  handleReSendPhone = () => this.props.reSendPhone()

  handleChangeTab = () =>
    this.setState(prevState => ({isLogin: !prevState.isLogin}))

  setDefaultAuthState = () => this.setState({isLogin: true})

  render() {
    return (
      <CustomModal
        centered={true}
        isOpen={this.props.modalShown}
        toggle={this.props.toggle}
        onClosed={this.setDefaultAuthState}
      >
        {this.state.isLogin ? (
          <Login
            login={this.props.login}
            handleChangeTab={this.handleChangeTab}
            isLoginPending={this.props.isLoginPending}
          />
        ) : this.props.regsitrationStep === 0 ? (
          <SignUp
            signUp={this.props.signUp}
            handleChangeTab={this.handleChangeTab}
            isPhonePending={this.props.isPhonePending}
            inviterToken={this.props.inviterToken}
          />
        ) : this.props.regsitrationStep === 1 ? (
          <PhoneCode
            sendCode={this.props.sendCode}
            codeSent={this.props.codeSent}
            phone={this.props.phone}
            isCodePending={this.props.isCodePending}
            handleReSendPhone={this.handleReSendPhone}
          />
        ) : null}
      </CustomModal>
    )
  }
}

export default compose<React.ComponentType<AuthenticationOwnProps>>(
  withRegistration,
  withUser
)(Authentication)
