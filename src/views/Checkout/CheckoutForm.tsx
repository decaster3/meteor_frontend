import React from "react"
import {reduxForm, Field} from "redux-form/immutable"
import {PulseLoader} from "react-spinners"
import {InjectedFormProps} from "redux-form"
import {Map as ImmutableMap} from "immutable"

import {
  normalizePhone,
  validatePhone,
  validatePresence,
  validateIsUserPhone,
} from "../../forms/validationsAndNormalizing"
import CustomInput from "../../forms/CustomInput"
import CustomSelect from "../../forms/CustomSelect"
import {cx, css} from "emotion"
import {compose} from "redux"
import {ThemeProps, withTheme} from "../App/Theme"
import {PrimaryButton} from "../PrimaryButton"

interface CheckoutFormOwnProps {
  isOrderPending: boolean
  userPhone: string
  streets: string[]
  total: number
}

interface CheckoutFormData {
  name?: string
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

type CheckoutFormProps = ThemeProps &
  CheckoutFormOwnProps &
  InjectedFormProps<ImmutableMapOfCheckoutFormData, CheckoutFormOwnProps>

interface CheckoutFormState {
  paymentMethod?: string
}

class CheckoutForm extends React.Component<
  CheckoutFormProps,
  CheckoutFormState
> {
  static RequiredStar: React.SFC<React.HTMLProps<HTMLSpanElement>> = props => (
    <span className="text-danger mx-1" {...props}>
      *
    </span>
  )

  state: CheckoutFormState = {}

  handleChoosePaymentMethod = (
    event: React.SyntheticEvent<HTMLInputElement>,
    newValue: string
  ) => {
    this.setState({paymentMethod: newValue})
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <h2 className="mb-4">Оформление заказа</h2>

        <div className="row mt-3">
          <div className="col-6">
            <h3
              className={cx(
                "mb-4",
                css`
                  color: ${this.props.theme.lighterGrey};
                `
              )}
            >
              Доставка
            </h3>

            <div className="form-group row mb-5">
              <label className="col-3 col-form-label" htmlFor="phone">
                Телефон<CheckoutForm.RequiredStar />
              </label>
              <div className="col-9">
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

            <div className="form-group row mb-5">
              <label className="col-3 col-form-label" htmlFor="name">
                Имя<CheckoutForm.RequiredStar />
              </label>
              <div className="col-9">
                <Field
                  component={CustomInput}
                  name="name"
                  props={{
                    id: "name",
                    type: "text",
                    placeholder: "Имя",
                    autoComplete: "name",
                  }}
                />
              </div>
            </div>

            <div className="form-group row mb-5">
              <label className="col-3 col-form-label" htmlFor="street">
                Улица<CheckoutForm.RequiredStar />
              </label>
              <div className="col-9">
                <Field
                  options={this.props.streets}
                  name="street"
                  component={CustomSelect}
                  props={{
                    id: "street",
                    placeholder: "Улица",
                  }}
                />
              </div>
            </div>

            <div className="form-group row mb-5">
              <label className="col-3 col-form-label" htmlFor="building">
                Дом<CheckoutForm.RequiredStar />
              </label>

              <div className="col">
                <Field
                  component={CustomInput}
                  name="building"
                  props={{
                    id: "building",
                    type: "text",
                    placeholder: "Дом",
                    autoComplete: "building",
                  }}
                />
              </div>

              <label className="col-auto col-form-label" htmlFor="apartment">
                Квартира<CheckoutForm.RequiredStar />
              </label>

              <div className="col">
                <Field
                  component={CustomInput}
                  name="apartment"
                  props={{
                    id: "apartment",
                    type: "text",
                    placeholder: "Квартира",
                    autoComplete: "apartment",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-6">
            <h3
              className={cx(
                "mb-4",
                css`
                  color: ${this.props.theme.lighterGrey};
                `
              )}
            >
              Оплата
            </h3>

            <nav className="nav nav-pills nav-fill mb-5 text-uppercase font-weight-bold">
              <label
                htmlFor="cash"
                className={cx(
                  "nav-item nav-link mb-0",
                  css`
                    padding-top: 6px;
                    padding-bottom: 6px;
                    color: ${this.props.theme.lightGreen};
                    border: 1px solid ${this.props.theme.lightGreen};

                    &&.active {
                      background: ${this.props.theme.lightGreen};
                    }

                    & + label {
                      margin-left: 16px;
                    }
                  `,
                  {
                    active: this.state.paymentMethod === "cash",
                  }
                )}
              >
                <Field
                  name="paymentMethod"
                  id="cash"
                  component="input"
                  type="radio"
                  value="cash"
                  props={{className: "form-check-input d-none"}}
                  onChange={this.handleChoosePaymentMethod}
                />
                Наличные
              </label>

              <label
                htmlFor="cashless"
                className={cx(
                  "nav-item nav-link mb-0",
                  css`
                    padding-top: 6px;
                    padding-bottom: 6px;
                    color: ${this.props.theme.lightGreen};
                    border: 1px solid ${this.props.theme.lightGreen};

                    &&.active {
                      background: ${this.props.theme.lightGreen};
                    }
                  `,
                  {
                    active: this.state.paymentMethod === "cashless",
                  }
                )}
              >
                <Field
                  name="paymentMethod"
                  id="cashless"
                  component="input"
                  type="radio"
                  value="cashless"
                  props={{className: "form-check-input d-none"}}
                  onChange={this.handleChoosePaymentMethod}
                />
                Карта
              </label>
            </nav>

            <div className="form-group row mb-5">
              <label className="col-3 col-form-label" htmlFor="total">
                К оплате
              </label>
              <div className="col-9">
                <input
                  value={this.props.total}
                  className="form-control"
                  name="total"
                  id="total"
                  placeholder="К оплате"
                  readOnly
                />
              </div>
            </div>

            <div className="form-group row mb-5">
              <label className="col-3 col-form-label" htmlFor="comment">
                Комментарий
              </label>
              <div className="col-9">
                <Field
                  component={CustomInput}
                  name="comment"
                  props={{
                    id: "comment",
                    type: "text",
                    placeholder: "Комментарий",
                    autoComplete: "comment",
                  }}
                />
              </div>
            </div>

            <div style={{color: "red", textAlign: "center"}}>
              {this.props.error && <strong>{this.props.error}</strong>}
            </div>

            <PrimaryButton type="submit" disabled={this.props.isOrderPending}>
              {this.props.isOrderPending ? (
                <PulseLoader color={"#ffffff"} size={8} />
              ) : (
                "Заказать"
              )}
            </PrimaryButton>
          </div>
        </div>
      </form>
    )
  }
}

const validateCheckoutFrom = (values: ImmutableMapOfCheckoutFormData) =>
  ({
    phone: validatePhone(values.get("phone")),
    name: validatePresence(values.get("name")),
    street: validatePresence(values.get("street")),
    building: validatePresence(values.get("building")),
    apartment: validatePresence(values.get("apartment")),
    paymentMethod: validatePresence(values.get("paymentMethod")),
  } as any)

const warningCheckoutForm = (
  values: ImmutableMapOfCheckoutFormData,
  props: CheckoutFormOwnProps
) =>
  ({
    phone: validateIsUserPhone(values.get("phone"), props.userPhone),
  } as any)

export default compose(
  reduxForm<ImmutableMapOfCheckoutFormData, CheckoutFormOwnProps>({
    form: "checkout",
    warn: warningCheckoutForm,
    validate: validateCheckoutFrom,
  }),
  withTheme
)(CheckoutForm)
