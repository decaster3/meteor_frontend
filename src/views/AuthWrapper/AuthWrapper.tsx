import React from "react"
import {Modal} from "reactstrap"

import * as styles from "./AuthWrapper.module.scss"
import Login from "../Login"
import SignUp from "../Signup"
import PhoneCode from "../PhoneCode"
import {compose} from "redux"
import {
  withRegistration,
  withUser,
  UserStateProps,
  RegistrationDispatchProps,
  RegistrationStateProps,
  UserDispatchProps,
} from "../../containers/UserSession"
import {UserState} from "../../containers/UserSession/constants"

interface AuthenticationState {
  modalShown: boolean
  isLogin: boolean
}

interface AuthenticationOwnProps {
  registrationFirst: boolean
}

type AuthenticationProps = UserStateProps &
  RegistrationDispatchProps &
  RegistrationStateProps &
  UserDispatchProps &
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

  constructor(props: AuthenticationProps) {
    super(props)
    this.state = {
      isLogin: true,
      modalShown: false,
    }
  }

  toggleModal = () => {
    if (this.props.registrationFirst) {
      this.setState({isLogin: false})
    }
    this.setState(prevState => ({modalShown: !prevState.modalShown}))
  }

  handleReSendPhone = () => {
    this.props.reSendPhone()
  }

  handleChangeTab = () =>
    this.setState(prevState => ({isLogin: !prevState.isLogin}))

  setDefaultAuthState = () => this.setState(prevState => ({isLogin: true}))

  renderRegsitration = () => {
    switch (this.props.regsitrationStep) {
      case 0:
        return (
          <SignUp
            signUp={this.props.signUp}
            handleChangeTab={this.handleChangeTab}
            isPhonePending={this.props.isPhonePending}
            inviterToken={this.props.inviterToken}
          />
        )
      case 1:
        return (
          <PhoneCode
            sendCode={this.props.sendCode}
            codeSent={this.props.codeSent}
            phone={this.props.phone}
            isCodePending={this.props.isCodePending}
            handleReSendPhone={this.handleReSendPhone}
          />
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div onClick={this.toggleModal}>{this.props.children}</div>
        <Modal
          centered={true}
          isOpen={this.state.modalShown}
          toggle={this.toggleModal}
          contentClassName={styles.modalContent}
          onClosed={this.setDefaultAuthState}
        >
          {this.state.isLogin ? (
            <Login
              login={this.props.login}
              handleChangeTab={this.handleChangeTab}
              isLoginPending={this.props.isLoginPending}
            />
          ) : (
            this.renderRegsitration()
          )}
        </Modal>
      </div>
    )
  }
}

export default compose<React.ComponentType<AuthenticationOwnProps>>(
  withRegistration,
  withUser
)(Authentication)
