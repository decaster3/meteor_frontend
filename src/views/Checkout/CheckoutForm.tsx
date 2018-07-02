import * as React from "react"
import {reduxForm} from "redux-form/immutable"
import * as classnames from "classnames"
import {Field} from "redux-form/immutable"
import {Link} from "react-router-dom"
import {PulseLoader} from "react-spinners"
import {InjectedFormProps} from "redux-form"
import {Map as ImmutableMap, fromJS} from "immutable"

import {
  normalizePhone,
  validatePhone,
  validatePresence,
  validateIsUserPhone,
} from "../../forms/validationsAndNormalizing"
import * as styles from "./index.module.scss"
import CustomInput from "../../forms/CustomInput"
import CustomSelect from "../../forms/CustomSelect"

interface CheckoutFormProps {
  isOrderPending: boolean
  userPhone: string
  streets: string[]
}

interface CheckoutFormData {
  phone?: string
  street?: string
  building?: string
  apartment?: string
  paymentMethod?: string
  comment?: string
}

type ImmutableMapOfCheckoutFormData = ImmutableMap<
  keyof CheckoutFormData,
  string
>

const CheckoutForm: React.StatelessComponent<
  CheckoutFormProps &
    InjectedFormProps<ImmutableMapOfCheckoutFormData, CheckoutFormProps>
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
        Имя
      </label>
      <div className="col-8">
        <Field
          component={CustomInput}
          name="name"
          props={{
            id: "name",
            type: "name",
            placeholder: "Имя",
            autoComplete: "name",
          }}
        />
      </div>
    </div>

    <div className="form-group row">
      <label className="col-4 col-form-label" htmlFor="password">
        Улица
      </label>
      <div className="col-8">
        <Field
          options={props.streets}
          name="street"
          component={CustomSelect}
          props={{placeholder: "Улица", options: props.streets}}
        />
      </div>
    </div>

    <div className="form-group row">
      <label className="col-4 col-form-label" htmlFor="password">
        Строение
      </label>
      <div className="col-8">
        <Field
          component={CustomInput}
          name="building"
          props={{
            id: "building",
            type: "building",
            placeholder: "Строение",
            autoComplete: "building",
          }}
        />
      </div>
    </div>

    <div className="form-group row">
      <label className="col-4 col-form-label" htmlFor="password">
        Квартира
      </label>
      <div className="col-8">
        <Field
          component={CustomInput}
          name="apartment"
          props={{
            id: "apartment",
            type: "apartment",
            placeholder: "Квартира",
            autoComplete: "apartment",
          }}
        />
      </div>
    </div>

    <div className="form-group row">
      <label className="col-4 col-form-label" htmlFor="password">
        Комментарий к заказу
      </label>
      <div className="col-8">
        <Field
          component={CustomInput}
          name="comment"
          props={{
            id: "comment",
            type: "comment",
            placeholder: "Комментарий",
            autoComplete: "comment",
          }}
        />
      </div>
    </div>

    <div className="form-group row">
      <label className="col-4 col-form-label" htmlFor="password">
        Метод оплаты
      </label>

      <div className="col-8 d-flex justify-content-around">
        <div className="form-check form-check-inline align-items-baseline">
          <Field
            name="paymentMethod"
            id="cash"
            component={"input"}
            type="radio"
            value="cash"
            props={{className: "form-check-input mr-3"}}
          />
          <label className="form-check-label text-uppercase" htmlFor="cash">
            Наличка
          </label>
        </div>

        <div className="form-check form-check-inline align-items-baseline">
          <Field
            name="paymentMethod"
            id="cashless"
            component={"input"}
            type="radio"
            value="cashless"
            props={{className: "form-check-input mr-3"}}
          />
          <label className="form-check-label text-uppercase" htmlFor="cashless">
            Карта
          </label>
        </div>
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
          disabled={props.isOrderPending}
        >
          {props.isOrderPending ? (
            <PulseLoader color={"#ffffff"} size={8} />
          ) : (
            <span>Заказать</span>
          )}
        </button>
      </div>
    </div>
  </form>
)

const validateCheckoutFrom = (values: ImmutableMapOfCheckoutFormData) =>
  ({
    phone: validatePhone(values.get("phone")),
    street: validatePresence(values.get("street")),
    building: validatePresence(values.get("building")),
    apartment: validatePresence(values.get("apartment")),
    paymentMethod: validatePresence(values.get("paymentMethod")),
  } as any)

const warningCheckoutForm = (
  values: ImmutableMapOfCheckoutFormData,
  props: CheckoutFormProps
) =>
  ({
    phone: validateIsUserPhone(values.get("phone"), props.userPhone),
  } as any)

export default reduxForm<ImmutableMapOfCheckoutFormData, CheckoutFormProps>({
  form: "checkout",
  warn: warningCheckoutForm,
  validate: validateCheckoutFrom,
})(CheckoutForm)
