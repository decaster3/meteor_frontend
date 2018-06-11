import * as React from "react"
import {reduxForm} from "redux-form/immutable"
import * as classnames from "classnames"
import {Field} from "redux-form/immutable"
import {PulseLoader} from "react-spinners"
import {InjectedFormProps} from "redux-form"
import {Map as ImmutableMap} from "immutable"

import {codeValidation} from "../../forms/validationsAndNormalizing"
import * as styles from "./index.module.scss"
import CustomInput from "../../forms/CustomInput"

interface PhoneCodeFormProps {
  isCodePending: boolean
}

export interface PhoneCodeFormData {
  code: string
}

export type ImmutablePhoneCodeFormData = ImmutableMap<
  keyof PhoneCodeFormData,
  string
>

const PhoneCodeForm: React.StatelessComponent<
  PhoneCodeFormProps &
    InjectedFormProps<ImmutablePhoneCodeFormData, PhoneCodeFormProps>
> = props => {
  return (
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
              type: "phone",
              placeholder: "Teлефон",
              autoComplete: "phone",
              readOnly: true,
            }}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-4 col-form-label" htmlFor="code">
          Код из смс
        </label>
        <div className="col-8">
          <Field
            component={CustomInput}
            name="code"
            props={{
              id: "code",
              type: "code",
              placeholder: "Код",
              autoComplete: "code",
            }}
          />
        </div>
      </div>
      <div style={{color: "red", textAlign: "center"}}>
        {props.error && <strong>{props.error}</strong>}
      </div>
      <div className="row">
        <div className="col">
          <button
            className="btn btn-block btn-success"
            type="submit"
            disabled={props.isCodePending}
          >
            {props.isCodePending ? (
              <PulseLoader color={"#ffffff"} size={8} />
            ) : (
              <span>Далее</span>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

const validateCodeFrom = (values: ImmutablePhoneCodeFormData) =>
  ({
    code: codeValidation(values.get("code")),
  } as any)

export default reduxForm<ImmutablePhoneCodeFormData, PhoneCodeFormProps>({
  form: "registrationCode",
  validate: validateCodeFrom,
})(PhoneCodeForm)
