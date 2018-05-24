import * as React from "react"
import {reduxForm} from "redux-form/immutable"
import * as classnames from "classnames"
import {Field} from "redux-form/immutable"
import {Link} from "react-router-dom"

import * as styles from "./index.module.scss"
import CustomInput from "./CustomInput"
import {PulseLoader} from "react-spinners"

const PhoneForm = ({
  handleSubmit,
  handleChangeTab,
  isPhonePending,
}: {
  isPhonePending: boolean
  handleChangeTab(): void
  handleSubmit(event: React.SyntheticEvent<HTMLFormElement>): void
}) => (
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
              type: "tel",
              placeholder: "Телефон",
              autoComplete: "tel",
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
    <div className="row">
      <div className={classnames(styles.miniLabel, "col")}>
        Есть аккаунт?
        <button onClick={handleChangeTab}>Войти</button>
      </div>
    </div>
  </div>
)

export interface PhoneFormValues {
  phone: string
}

const validatePhoneFrom = (values: any) => ({
  phone: values.get("phone") ? undefined : "Required",
})

export default reduxForm({
  form: "registrationPhone",
  validate: validatePhoneFrom,
})(PhoneForm as any)
