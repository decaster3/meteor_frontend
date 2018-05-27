import * as React from "react"
import {reduxForm} from "redux-form/immutable"
import * as classnames from "classnames"
import {Field} from "redux-form/immutable"
import {Link} from "react-router-dom"

import LoginForm from "./LoginForm"
import * as styles from "./Login.module.scss"

interface LoginProps {
  isLoginPending: boolean
  login(password: string, phone: string): void
  handleChangeTab(): void
}

class Login extends React.Component<LoginProps> {
  handleLoginSubmittttttt = (values: any) => {
    this.props.login(values.get("phone"), values.get("password"))
  }

  render() {
    return (
      <div>
        <div className={styles.modalTitle}>
          <h4 className="text-center mb-3 font-weight-bold">Вход</h4>
        </div>
        <LoginForm
          // @ts-ignore
          isLoginPending={isLoginPending}
          onSubmit={this.handleLoginSubmittttttt}
        />
        <div className="row">
          <div className={classnames(styles.miniLabel, "col")}>
            Нет аккаунта?
            <button onClick={this.props.handleChangeTab}>
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
