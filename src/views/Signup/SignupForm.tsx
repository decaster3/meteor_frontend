import * as React from "react"
import {reduxForm} from "redux-form/immutable"
import * as classnames from "classnames"
import {Field} from "redux-form/immutable"
import {Link} from "react-router-dom"
import {
  normalizePhone,
  validatePhone,
  passwordValidation,
  passwordConfirmationValidation,
} from "../../forms/validationsAndNormalizing"

import * as styles from "./index.module.scss"
import CustomInput from "../../forms/CustomInput"
import {PulseLoader} from "react-spinners"

const SignupForm = ({
  handleSubmit,
  isPhonePending,
}: {
  isPhonePending: boolean
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
    <div className="form-group row">
      <label className="col-4 col-form-label" htmlFor="phone">
        Подтверждение пароля
      </label>
      <div className="col-8">
        <Field
          component={CustomInput}
          name="passwordConfirmation"
          props={{
            id: "passwordConfirmation",
            type: "password",
            placeholder: "Подтверждение пароля",
          }}
        />
      </div>
    </div>
    <div className="form-group row">
      <div className="col">
        <button
          className="btn btn-block btn-success"
          type="submit"
          disabled={isPhonePending}
        >
          {isPhonePending ? (
            <PulseLoader color={"#ffffff"} size={8} />
          ) : (
            <span>Отправить код</span>
          )}
        </button>
      </div>
    </div>
  </form>
)

const validateSignUpForm = (values: any) => ({
  phone: validatePhone(values.get("phone")),
  password: passwordValidation(values.get("password")),
  passwordConfirmation: passwordConfirmationValidation(
    values.get("password"),
    values.get("passwordConfirmation")
  ),
})

export default reduxForm({
  form: "signUp",
  validate: validateSignUpForm,
})(SignupForm as any)
