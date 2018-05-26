import * as React from "react"
import {reduxForm} from "redux-form/immutable"
import * as classnames from "classnames"
import {Field, InjectedFormProps} from "redux-form"
import {Link} from "react-router-dom"

import * as styles from "./index.module.scss"
import CustomInput from "../../forms/CustomInput"

const LoginForm = (
  props: InjectedFormProps & {
    handleChangeTab(): void
  }
) => (
  <div>
    <div className={styles.modalTitle}>
      <h4 className="text-center mb-3 font-weight-bold">Вход</h4>
    </div>
    <form onSubmit={props.handleSubmit}>
      <div className="form-group row">
        <label className="col-4 col-form-label" htmlFor="phone">
          Телефон
        </label>
        <div className="col-8">
          <Field
            component={CustomInput}
            name="phone"
            props={{
              id: "phone",
              type: "tel",
              placeholder: "Телефон",
              autoComplete: "tel",
            }}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-4 col-form-label" htmlFor="password">
          Пароль
        </label>
        <div className="col-8">
          <Field
            component={CustomInput}
            name="password"
            props={{
              id: "password",
              type: "password",
              placeholder: "Пароль",
              autoComplete: "current-password",
            }}
          />
        </div>
      </div>
      <div className="row form-group">
        <div className="col">
          <button className="btn btn-block btn-success" type="submit">
            Войти
          </button>
        </div>
      </div>
    </form>
    <div className="row">
      <div className={classnames(styles.miniLabel, "col")}>
        Нет аккаунта?
        <button onClick={props.handleChangeTab}>Зарегистрироваться</button>
      </div>
    </div>
  </div>
)

export interface LoginFormValues {
  phone: string
  password: string
}

const validateLoginFrom = (values: LoginFormValues) => ({
  phone: values.phone ? undefined : "Required",
  password: values.password ? undefined : "Required",
})

export default reduxForm({
  form: "login",
  validate: validateLoginFrom,
})(LoginForm as any)
