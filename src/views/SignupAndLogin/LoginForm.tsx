import * as React from "react"
import {reduxForm} from "redux-form/immutable"
import {Field} from "redux-form"
import {Link} from "react-router-dom"

import CustomInput from "./CustomInput"

const LoginForm = ({
  handleSubmit,
}: {
  handleSubmit(event: React.SyntheticEvent<HTMLFormElement>): void
}) => (
  <form onSubmit={handleSubmit}>
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
    <div className="row">
      <div className="col">
        <button className="btn btn-block btn-success" type="submit">
          Войти
        </button>
      </div>
    </div>
  </form>
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
})(LoginForm)
