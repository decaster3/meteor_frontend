import * as React from "react"
import {reduxForm, Field} from "redux-form/immutable"
import * as classnames from "classnames"
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
import {InjectedFormProps} from "redux-form"
import {Map as ImmutableMap, fromJS} from "immutable"

interface SignupFormProps {
  isPhonePending: boolean
}

interface SignupFormValues {
  inviterToken?: string
  name?: string
  phone?: string
  password?: string
  passwordConfirmation?: string
}

const SignupForm: React.StatelessComponent<
  SignupFormProps &
    InjectedFormProps<
      ImmutableMap<keyof SignupFormValues, string>,
      SignupFormProps
    >
> = props => (
  <form onSubmit={props.handleSubmit}>
    <div className="form-group row">
      <label className="col-4 col-form-label" htmlFor="phone">
        Имя
      </label>
      <div className="col-8">
        <Field
          component={CustomInput}
          name="name"
          normalize={normalizePhone}
          props={{
            id: "name",
            type: "tel",
            placeholder: "Имя",
            autoComplete: "name",
          }}
        />
      </div>
    </div>
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
        Токен пригласителя
      </label>
      <div className="col-8">
        <Field
          component={CustomInput}
          name="inviterToken"
          normalize={normalizePhone}
          props={{
            id: "inviterToken",
            type: "text",
            placeholder: "Токен пригласителя",
            autoComplete: "inviterToken",
            readOnly: (props.initialValues as any).get("inviterToken")
              ? true
              : false,
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
    <div style={{color: "red", textAlign: "center"}}>
      {props.error && <strong>{props.error}</strong>}
    </div>
    <div className="form-group row">
      <div className="col">
        <button
          className="btn btn-block btn-success"
          type="submit"
          disabled={props.isPhonePending}
        >
          {props.isPhonePending ? (
            <PulseLoader color={"#ffffff"} size={8} />
          ) : (
            <span>Отправить код</span>
          )}
        </button>
      </div>
    </div>
  </form>
)

const validateSignUpForm = (
  // Hack since it takes and expects objects of the same shape,
  // but gets an ImmutableJS object and returns plain one
  values: ImmutableMap<keyof SignupFormValues, string> & SignupFormValues
) => ({
  name: values.get("name") ? undefined : "Обязательно",
  phone: validatePhone(values.get("phone")),
  password: passwordValidation(values.get("password")),
  passwordConfirmation: passwordConfirmationValidation(
    values.get("password"),
    values.get("passwordConfirmation")
  ),
})

export default reduxForm<
  // Hack since it takes and expects objects of the same shape,
  // but gets an ImmutableJS object and returns plain one
  ImmutableMap<keyof SignupFormValues, string> & SignupFormValues,
  SignupFormProps
>({
  form: "signUp",
  validate: validateSignUpForm,
})(SignupForm)
