import * as React from "react"
import {reduxForm} from "redux-form/immutable"
import {Field} from "redux-form"
import {Link} from "react-router-dom"

import * as styles from "./index.module.scss"
import CustomInput from "./CustomInput"

const PasswordForm = ({
  handleSubmit,
}: {
  handleSubmit(event: React.SyntheticEvent<HTMLFormElement>): void
}) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group row">
      <label className="col-4 col-form-label" htmlFor="phone">
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
            autoComplete: "password",
          }}
        />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <button className="btn btn-block btn-success" type="submit">
          Зарегестрироваться
        </button>
      </div>
    </div>
  </form>
)

export interface PasswordFormValues {
  password: string
}

const validatePasswordFrom = (values: PasswordFormValues) => ({
  password: values.password ? undefined : "Required",
})

export default reduxForm({
  form: "registrationPassword",
  validate: validatePasswordFrom,
})(PasswordForm)
