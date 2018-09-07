import React from "react"
import {withRegistration} from "../../containers/UserSession"
import {compose} from "redux"
import LoginForm from "./LoginForm"

interface LoginProps {
  isLoginPending: boolean
  login(password: string, phone: string): void
  handleChangeTab(): void
}

class Login extends React.Component<LoginProps> {
  handleLoginSubmit = (values: any) => {
    return this.props.login(values.get("password"), values.get("phone"))
  }

  render() {
    console.log(this.props.isLoginPending)
    return (
      <div>
        <h4 className="text-center mb-3 font-weight-bold">Вход</h4>
        <LoginForm
          isLoginPending={this.props.isLoginPending}
          onSubmit={this.handleLoginSubmit}
        />
        <div className="row align-items-center">
          <div className={"col-auto"}>Нет аккаунта?</div>
          <div className="col">
            <button
              className="btn btn-block btn-outline-success"
              onClick={this.props.handleChangeTab}
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(withRegistration)(Login)
