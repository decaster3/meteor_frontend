import React from "react"
import {reduxForm, Field} from "redux-form/immutable"
import {validatePhone, validatePassword} from "../../forms/validations"

import CustomInput from "../../forms/CustomInput"
import {PulseLoader} from "react-spinners"
import {InjectedFormProps} from "redux-form"
import {Map as ImmutableMap} from "immutable"
import {normalizePhone} from "../../forms/normalizations"

interface SignupFormProps {
  isPhonePending: boolean
}

interface SignupFormData {
  inviterToken?: string
  name?: string
  phone?: string
  password?: string
  passwordConfirmation?: string
}

type ImmutableMapOfSignupFormData = ImmutableMap<keyof SignupFormData, string>

const SignupForm: React.StatelessComponent<
  SignupFormProps &
    InjectedFormProps<ImmutableMapOfSignupFormData, SignupFormProps>
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
      <label className="col-4 col-form-label" htmlFor="inviterToken">
        Код пригласителя
      </label>
      <div className="col-8">
        <Field
          component={CustomInput}
          name="inviterToken"
          props={{
            id: "inviterToken",
            type: "text",
            placeholder: "Код пригласителя",
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

const validateSignUpForm = (values: ImmutableMapOfSignupFormData) =>
  ({
    name: values.get("name") ? undefined : "Обязательно",
    phone: validatePhone(values.get("phone")),
    password: validatePassword(values.get("password")),
  } as any)

export default reduxForm<ImmutableMapOfSignupFormData, SignupFormProps>({
  form: "signUp",
  validate: validateSignUpForm,
})(SignupForm)
