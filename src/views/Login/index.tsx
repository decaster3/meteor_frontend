import * as React from "react"
import {reduxForm} from "redux-form/immutable"
import * as classnames from "classnames"
import {Field} from "redux-form/immutable"
import {Link} from "react-router-dom"
import LoginForm from "./LoginForm"
import * as styles from "./index.module.scss"

const Login = ({
  login,
  handleChangeTab,
}: {
  login(password: string, phone: string): void
  handleChangeTab(): void
}) => {
  const handleLoginSubmit = (values: any) => {
    login(values.get("phone"), values.get("password"))
  }
  return (
    <div>
      <div className={styles.modalTitle}>
        <h4 className="text-center mb-3 font-weight-bold">Вход</h4>
      </div>
      <LoginForm onSubmit={handleLoginSubmit} />
      <div className="row">
        <div className={classnames(styles.miniLabel, "col")}>
          Нет аккаунта?
          <button onClick={handleChangeTab}>Зарегистрироваться</button>
        </div>
      </div>
    </div>
  )
}

export default Login
