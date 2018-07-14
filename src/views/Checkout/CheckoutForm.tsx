import * as React from "react"
// tslint:disable-next-line:no-submodule-imports
import {reduxForm, Field} from "redux-form/immutable"
// tslint:disable-next-line:no-duplicate-imports
import {PulseLoader} from "react-spinners"
import {InjectedFormProps} from "redux-form"
import {Map as ImmutableMap, fromJS} from "immutable"

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

const inputStyle = css`
  border-radius: 24px;
`

interface CheckoutFormOwnProps {
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
        <div className="row mt-3">
          <div className="col-6">
            <div className="form-group row">
              <label className="col-3 col-form-label" htmlFor="phone">
                Телефон
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
                    className: inputStyle,
                  }}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-3 col-form-label" htmlFor="name">
                Имя
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
                    className: inputStyle,
                  }}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-3 col-form-label" htmlFor="street">
                Улица
              </label>
              <div className="col-9">
                <Field
                  options={this.props.streets}
                  name="street"
                  component={CustomSelect}
                  props={{
                    id: "street",
                    placeholder: "Улица",
                    className: inputStyle,
                  }}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-3 col-form-label" htmlFor="building">
                Дом
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
                    className: inputStyle,
                  }}
                />
              </div>

              <label className="col-auto col-form-label" htmlFor="apartment">
                Квартира
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
                    className: inputStyle,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-6">
            <nav className="nav nav-pills nav-fill mb-5 text-uppercase font-weight-bold">
              <label
                htmlFor="cash"
                className={cx(
                  "nav-item nav-link mb-0",
                  css`
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

            <div className="form-group row">
              <label className="col-4 col-form-label" htmlFor="comment">
                Комментарий
              </label>
              <div className="col-8">
                <Field
                  component={CustomInput}
                  name="comment"
                  props={{
                    id: "comment",
                    type: "text",
                    placeholder: "Комментарий",
                    autoComplete: "comment",
                    className: inputStyle,
                  }}
                />
              </div>
            </div>

            <div style={{color: "red", textAlign: "center"}}>
              {this.props.error && <strong>{this.props.error}</strong>}
            </div>

            <button
              className={cx(
                css`
                  color: white;
                  display: block;
                  background-color: ${this.props.theme.lightGreen};
                  border-radius: 2.25rem/2rem;
                  border: none;
                  letter-spacing: 0.125em;
                  font-weight: 500;
                  padding: 0.5rem 1.5rem;
                  text-transform: uppercase;
                  width: 100%;
                `,
                css({
                  background: `linear-gradient(
                      ${this.props.theme.lightGreen},
                      ${this.props.theme.lightGreen} 50%,
                      ${this.props.theme.darkGreen} 50%,
                      ${this.props.theme.darkGreen}
                    )`,
                })
              )}
              type="submit"
              disabled={this.props.isOrderPending}
            >
              {this.props.isOrderPending ? (
                <PulseLoader color={"#ffffff"} size={8} />
              ) : (
                <span>Заказать</span>
              )}
            </button>
          </div>
        </div>
      </form>
    )
  }
}

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
