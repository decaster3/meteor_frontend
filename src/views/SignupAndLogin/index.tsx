import * as React from "react"
import * as cn from "classnames"
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"
import {WrappedFieldProps, Field, reduxForm} from "redux-form"
import {Link, Switch, Route} from "react-router-dom"

import * as styles from "./index.module.scss"
import CustomInput from "./CustomInput"
import LoginForm, {LoginFormValues} from "./LoginForm"
import PhoneForm, {PhoneFormValues} from "./PhoneForm"
import CodeForm, {CodeFormValues} from "./CodeForm"
import PasswordForm from "./PasswordForm"

interface AuthenticationState {
  modalShown: boolean
  isLogin: boolean
}
interface AuthenticationProps {
  codeSent: string
  regsitrationStep: number
  login(params: {password: string; phone: string}): void
  sendPhone(params: {phone: string}): void
  sendCode(params: {code: string}): void
  reSendPhone(): void
}

class Authentication extends React.Component<
  AuthenticationProps,
  AuthenticationState
> {
  state: AuthenticationState = {
    modalShown: false,
    isLogin: true,
  }

  toggleModal = () =>
    this.setState(prevState => ({modalShown: !prevState.modalShown}))

  handleLoginSubmit = (values: LoginFormValues) => {
    this.props.login(values)
    console.log(values)
  }

  handleCodeSubmit = (values: CodeFormValues) => {
    this.props.sendCode(values)
    console.log(values)
  }

  handlePhoneSubmit = (values: PhoneFormValues) => {
    this.props.sendPhone(values)
    console.log(values)
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
        return <PhoneForm onSubmit={this.handlePhoneSubmit} />
      case 1:
        return (
          <CodeForm
            onSubmit={this.handleCodeSubmit}
            // @ts-ignore
            codeSent={this.props.codeSent}
            handleReSendPhone={this.handleReSendPhone}
          />
        )
      case 2:
        return <PasswordForm />
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggleModal}>
          Show login modal
        </Button>

        <Modal
          centered={true}
          isOpen={this.state.modalShown}
          toggle={this.toggleModal}
          contentClassName={styles.modalContent}
          onClosed={this.setDefaultAuthState}
        >
          {this.state.isLogin ? (
            <LoginForm
              onSubmit={this.handleLoginSubmit}
              // @ts-ignore
              handleChangeTab={this.handleChangeTab}
            />
          ) : (
            this.renderRegsitration()
          )}
        </Modal>
      </div>
    )
  }
}

export default Authentication
