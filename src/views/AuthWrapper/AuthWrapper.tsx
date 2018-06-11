import * as React from "react"
import {Button, Modal} from "reactstrap"
import {WrappedFieldProps, Field, reduxForm} from "redux-form"
import {Link, Switch, Route} from "react-router-dom"

import * as styles from "./AuthWrapper.module.scss"
import Login from "../Login"
import SignUp from "../Signup"
import PhoneCode from "../PhoneCode"
import {compose} from "redux"
import {withRegistration, withUser} from "../../containers/UserSession"

interface AuthenticationState {
  modalShown: boolean
  isLogin: boolean
}

interface AuthenticationProps {
  phone: string
  inviterToken: string
  registrationFirst?: boolean
  codeSent: string
  regsitrationStep: number
  isCodePending: boolean
  isPhonePending: boolean
  isLoginPending: boolean
  login(phone: string, password: string): void
  signUp(
    inviterToken: string,
    name: string,
    phone: string,
    password: string,
    passwordConfirmation: string
  ): void
  sendCode(code: string): void
  reSendPhone(): void
}

class Authentication extends React.Component<
  AuthenticationProps,
  AuthenticationState
> {
  state: AuthenticationState = {
    isLogin: true,
    modalShown: false,
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

export default compose(withRegistration, withUser)(Authentication)
