import * as React from "react"
import {reduxForm, Field} from "redux-form/immutable"
import {PulseLoader} from "react-spinners"
import {InjectedFormProps} from "redux-form"
import {Map as ImmutableMap} from "immutable"

import {validatePhone} from "../../forms/validationsAndNormalizing"
import * as styles from "./PhoneCallbackForm.module.scss"
import CustomInput from "../../forms/CustomInput"

interface PhoneCallbackProps {
  isLoading: boolean
}

export interface PhoneCallbackData {
  phone: string
}

export type ImmutablePhoneCallbackData = ImmutableMap<
  keyof PhoneCallbackData,
  string
>

const PhoneCallback: React.StatelessComponent<
  PhoneCallbackProps &
    InjectedFormProps<ImmutablePhoneCallbackData, PhoneCallbackProps>
> = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group row">
        <label className="col-4 col-form-label" htmlFor="phone">
          Ваш Телефон
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
      <div style={{color: "red", textAlign: "center"}}>
        {props.error && <strong>{props.error}</strong>}
      </div>
      <div className="row">
        <div className="col">
          <button
            className="btn btn-block btn-success"
            type="submit"
            disabled={props.isLoading}
          >
            {props.isLoading ? (
              <PulseLoader color={"#ffffff"} size={8} />
            ) : (
              <span>Позвоните мне</span>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

const validatePhoneFrom = (values: ImmutablePhoneCallbackData) =>
  ({
    phone: validatePhone(values.get("phone")),
  } as any)

export default reduxForm<ImmutablePhoneCallbackData, PhoneCallbackProps>({
  form: "phoneCallbackForm",
  validate: validatePhoneFrom,
})(PhoneCallback)
