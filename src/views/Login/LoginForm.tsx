import * as React from "react"
import {reduxForm} from "redux-form/immutable"
import * as classnames from "classnames"
import {Field} from "redux-form/immutable"
import {Link} from "react-router-dom"
import {PulseLoader} from "react-spinners"
import {
  normalizePhone,
  validatePhone,
  passwordValidation,
} from "../../forms/validationsAndNormalizing"
import * as styles from "./index.module.scss"
import CustomInput from "../../forms/CustomInput"

const LoginForm = ({
  handleSubmit,
  error,
  isLoginPending,
}: {
  isLoginPending: boolean
  error: any
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
          normalize={normalizePhone}
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
    <div style={{color: "red", textAlign: "center"}}>
      {error && <strong>{error}</strong>}
    </div>
    <div className="row form-group">
      <div className="col">
        <button
          className="btn btn-block btn-success"
          type="submit"
          disabled={isLoginPending}
        >
          {isLoginPending ? (
            <PulseLoader color={"#ffffff"} size={8} />
          ) : (
            <span>Отправить код</span>
          )}
        </button>
      </div>
    </div>
  </form>
)

const validateLoginFrom = (values: any) => ({
  phone: validatePhone(values.get("phone")),
  password: passwordValidation(values.get("password")),
})

export default reduxForm({
  form: "login",
  validate: validateLoginFrom,
})(LoginForm as any)
