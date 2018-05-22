import * as React from "react"
import * as cn from "classnames"
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"
import posed from "react-pose"
import {styler, timeline, listen, easing, tween} from "popmotion"
import {WrappedFieldProps, Field, reduxForm} from "redux-form"
import {Link} from "react-router-dom"

import * as styles from "./index.module.scss"
import CustomInput from "./CustomInput"
import LoginForm, {LoginFormValues} from "./LoginForm"

interface LoginState {
  modalShown: boolean
}

class Login extends React.Component<{}, LoginState> {
  state: LoginState = {
    modalShown: true,
  }

  toggleModal = () => {
    this.setState(prevState => ({modalShown: !prevState.modalShown}))
  }

  handleLoginSubmit = (values: Partial<LoginFormValues>) => {
    console.log(values)
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
        >
          <div className={styles.modalTitle}>
            <h4 className="text-center mb-3 font-weight-bold">Войти</h4>
          </div>
          <LoginForm onSubmit={this.handleLoginSubmit} />
          <div className="row">
            <div className="col">
              <Link
                className="btn btn-block btn-outline-success mt-3"
                to="/signup"
              >
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Login
