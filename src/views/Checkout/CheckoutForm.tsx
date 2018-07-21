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
import {ThemeProps, withTheme, styled} from "../App/emotion"
import {PrimaryButton} from "../PrimaryButton"
import {CustomTextarea} from "../../forms/CustomTextarea"

interface CheckoutFormOwnProps {
  isOrderPending: boolean
  userPhone: string
  streets: string[]
  total: number
  meteors: number
  currency: string
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
  static PaymentMethodLabel = styled("label")`
    padding-top: 11px;
    padding-bottom: 11px;
    color: ${props => props.theme.lightGreen};
    border: 1px solid ${props => props.theme.lightGreen};

    &&.active {
      background: ${props => props.theme.lightGreen};
    }

    & + label {
      margin-left: 16px;
    }
  `

  static FormGroupRow: React.SFC = ({children}) => (
    <div className="form-group row mb-5">{children}</div>
  )

  static ColFormLabel: React.SFC<React.HTMLProps<HTMLLabelElement>> = ({
    children,
    htmlFor,
  }) => (
    <label className="col-3 col-form-label col-form-label-lg" htmlFor={htmlFor}>
      {children}
    </label>
  )

  static RequiredStar: React.SFC = () => (
    <span className="text-danger mx-1">*</span>
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

            <CheckoutForm.FormGroupRow>
              <CheckoutForm.ColFormLabel htmlFor="phone">
                Телефон<CheckoutForm.RequiredStar />
              </CheckoutForm.ColFormLabel>

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
                    className: "form-control-lg",
                  }}
                />
              </div>
            </CheckoutForm.FormGroupRow>

            <CheckoutForm.FormGroupRow>
              <CheckoutForm.ColFormLabel htmlFor="name">
                Имя<CheckoutForm.RequiredStar />
              </CheckoutForm.ColFormLabel>

              <div className="col-9">
                <Field
                  component={CustomInput}
                  name="name"
                  props={{
                    id: "name",
                    type: "text",
                    placeholder: "Имя",
                    autoComplete: "name",
                    className: "form-control-lg",
                  }}
                />
              </div>
            </CheckoutForm.FormGroupRow>

            <CheckoutForm.FormGroupRow>
              <CheckoutForm.ColFormLabel htmlFor="street">
                Улица<CheckoutForm.RequiredStar />
              </CheckoutForm.ColFormLabel>

              <div className="col-9">
                <Field
                  options={this.props.streets}
                  name="street"
                  component={CustomSelect}
                  props={{
                    id: "street",
                    placeholder: "Улица",
                    className: "form-control-lg",
                    size: "lg",
                  }}
                />
              </div>
            </CheckoutForm.FormGroupRow>

            <CheckoutForm.FormGroupRow>
              <CheckoutForm.ColFormLabel htmlFor="building">
                Дом<CheckoutForm.RequiredStar />
              </CheckoutForm.ColFormLabel>

              <div className="col">
                <Field
                  component={CustomInput}
                  name="building"
                  props={{
                    id: "building",
                    type: "text",
                    placeholder: "Дом",
                    autoComplete: "building",
                    className: "form-control-lg",
                  }}
                />
              </div>
            </CheckoutForm.FormGroupRow>

            <CheckoutForm.FormGroupRow>
              <CheckoutForm.ColFormLabel htmlFor="apartment">
                Квартира<CheckoutForm.RequiredStar />
              </CheckoutForm.ColFormLabel>

              <div className="col">
                <Field
                  component={CustomInput}
                  name="apartment"
                  props={{
                    id: "apartment",
                    type: "text",
                    placeholder: "Квартира",
                    autoComplete: "apartment",
                    className: "form-control-lg",
                  }}
                />
              </div>
            </CheckoutForm.FormGroupRow>
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
              <CheckoutForm.PaymentMethodLabel
                htmlFor="cash"
                className={cx("nav-item nav-link mb-0", {
                  active: this.state.paymentMethod === "cash",
                })}
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
              </CheckoutForm.PaymentMethodLabel>

              <CheckoutForm.PaymentMethodLabel
                htmlFor="cashless"
                className={cx("nav-item nav-link mb-0", {
                  active: this.state.paymentMethod === "cashless",
                })}
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
              </CheckoutForm.PaymentMethodLabel>
            </nav>

            <CheckoutForm.FormGroupRow>
              <CheckoutForm.ColFormLabel htmlFor="total">
                К оплате
              </CheckoutForm.ColFormLabel>
              <div className="col-9">
                <div className="input-group">
                  <input
                    value={this.props.total - this.props.meteors}
                    className="form-control text-right form-control-lg"
                    name="total"
                    id="total"
                    placeholder="К оплате"
                    readOnly
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">JYP</span>
                  </div>
                </div>
              </div>
            </CheckoutForm.FormGroupRow>

            <CheckoutForm.FormGroupRow>
              <CheckoutForm.ColFormLabel htmlFor="total" />
              <div className="col-9">
                <div className="input-group">
                  <input
                    value={this.props.meteors}
                    className="form-control text-right form-control-lg"
                    name="total"
                    id="total"
                    placeholder="К оплате"
                    readOnly
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">Метеоров</span>
                  </div>
                </div>
              </div>
            </CheckoutForm.FormGroupRow>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <CheckoutForm.FormGroupRow>
              <CheckoutForm.ColFormLabel htmlFor="comment">
                Комментарий
              </CheckoutForm.ColFormLabel>

              <div className="col-9">
                <Field
                  component={CustomTextarea}
                  name="comment"
                  props={{
                    id: "comment",
                    type: "text",
                    placeholder: "Комментарий к заказу",
                    autoComplete: "comment",
                    className: "form-control-lg",
                  }}
                />
              </div>
            </CheckoutForm.FormGroupRow>
          </div>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-auto">
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
