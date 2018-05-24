import * as React from "react"
import {reduxForm} from "redux-form/immutable"
import {Field} from "redux-form"
import {Link} from "react-router-dom"

import * as styles from "./index.module.scss"
import CustomInput from "./CustomInput"

const PhoneForm = ({
  handleSubmit,
}: {
  handleSubmit(event: React.SyntheticEvent<HTMLFormElement>): void
}) => (
  <form onSubmit={handleSubmit}>
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
            type: "tel",
            placeholder: "Телефон",
            autoComplete: "tel",
          }}
        />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <button className="btn btn-block btn-success" type="submit">
          Отправить код
        </button>
      </div>
    </div>
  </form>
)

export interface PhoneFormValues {
  phone: string
}

const validatePhoneFrom = (values: PhoneFormValues) => ({
  phone: values.phone ? undefined : "Required",
})

export default reduxForm({
  form: "registrationPhone",
  validate: validatePhoneFrom,
})(PhoneForm)
