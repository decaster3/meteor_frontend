import * as React from "react"
import {reduxForm} from "redux-form/immutable"
import {Field} from "redux-form/immutable"
import {Link} from "react-router-dom"

import * as styles from "./index.module.scss"
import CustomInput from "./CustomInput"

const PasswordForm = ({
  handleSubmit,
  initialValues,
  handleReSendPhone,
}: {
  initialValues: any
  handleReSendPhone(): void
  handleSubmit(event: React.SyntheticEvent<HTMLFormElement>): void
}) => {
  console.log("initialValues", initialValues)
  return (
    <div>
      <div className={styles.modalTitle}>
        <h4 className="text-center mb-3 font-weight-bold">Регистрация</h4>
      </div>
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
                type: "phone",
                placeholder: "Teлефон",
                autoComplete: "phone",
                readOnly: true,
              }}
            />
          </div>
        </div>
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
            <button onClick={handleReSendPhone} className="btn btn-default">
              Изменить номер
            </button>
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
    </div>
  )
}

export interface PasswordFormValues {
  phone: string
  password: string
}

const validatePasswordFrom = (values: PasswordFormValues) => ({
  password: values.password ? undefined : "Required",
})

export default reduxForm({
  form: "registrationPassword",
  validate: validatePasswordFrom,
})(PasswordForm as any)
