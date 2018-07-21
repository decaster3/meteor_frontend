import React from "react"
import {reduxForm, Field} from "redux-form/immutable"
import {PulseLoader} from "react-spinners"
import {InjectedFormProps} from "redux-form"
import {Map as ImmutableMap} from "immutable"

import {validatePhone, validatePassword} from "../../forms/validations"
import CustomInput from "../../forms/CustomInput"
import {normalizePhone} from "../../forms/normalizations"

interface LoginFormProps {
  isLoginPending: boolean
}

interface LoginFormData {
  phone?: string
  password?: string
}

type ImmutableMapOfLoginFormData = ImmutableMap<keyof LoginFormData, string>

const LoginForm: React.StatelessComponent<
  LoginFormProps &
    InjectedFormProps<ImmutableMapOfLoginFormData, LoginFormProps>
> = props => (
  <form onSubmit={props.handleSubmit}>
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
      {props.error && <strong>{props.error}</strong>}
    </div>
    <div className="row form-group">
      <div className="col">
        <button
          className="btn btn-block btn-success"
          type="submit"
          disabled={props.isLoginPending}
        >
          {props.isLoginPending ? (
            <PulseLoader color={"#ffffff"} size={8} />
          ) : (
            <span>Войти</span>
          )}
        </button>
      </div>
    </div>
  </form>
)

const validateLoginFrom = (values: ImmutableMapOfLoginFormData) =>
  ({
    phone: validatePhone(values.get("phone")),
    password: validatePassword(values.get("password")),
  } as any)

export default reduxForm<ImmutableMapOfLoginFormData, LoginFormProps>({
  form: "login",
  validate: validateLoginFrom,
})(LoginForm)
