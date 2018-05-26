import * as React from "react"
import {reduxForm} from "redux-form/immutable"
import * as classnames from "classnames"
import {Field} from "redux-form/immutable"
import {codeValidation} from "../../forms/validationsAndNormalizing"
import * as styles from "./index.module.scss"
import CustomInput from "../../forms/CustomInput"
import {PulseLoader} from "react-spinners"

const PhoneCodeForm = ({
  handleSubmit,
  isCodePending,
  initialValues,
}: {
  isCodePending: boolean
  initialValues: any
  handleSubmit(event: React.SyntheticEvent<HTMLFormElement>): void
}) => {
  console.log(isCodePending)
  return (
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
      <div className="row">
        <div className="col">
          <button
            className="btn btn-block btn-success"
            type="submit"
            disabled={isCodePending}
          >
            {isCodePending ? (
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

const validateCodeFrom = (values: any) => ({
  code: codeValidation(values.get("code")),
})

export default reduxForm({
  form: "registrationCode",
  validate: validateCodeFrom,
})(PhoneCodeForm as any)
