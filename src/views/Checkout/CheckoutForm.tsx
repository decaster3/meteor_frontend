import React, {SFC, HTMLProps, SyntheticEvent, Component} from "react"
import {reduxForm, Field} from "redux-form/immutable"
import {PulseLoader} from "react-spinners"
import {InjectedFormProps} from "redux-form"
import {Map as ImmutableMap} from "immutable"

import {
  validatePhone,
  validatePresence,
  validateIsUserPhone,
} from "../../forms/validations"
import CustomInput from "../../forms/CustomInput"
import CustomSelect from "../../forms/CustomSelect"
import {cx} from "emotion"
import {compose} from "redux"
import {ThemeProps, withTheme, styled} from "../App/emotion"
import {PrimaryButton} from "../PrimaryButton"
import {CustomTextarea} from "../../forms/CustomTextarea"
import {normalizePhone} from "../../forms/normalizations"

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
  isScheduledDelivery: boolean
}

class CheckoutForm extends Component<CheckoutFormProps, CheckoutFormState> {
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

  static Subtitle = styled("h3")`
    color: ${props => props.theme.lighterGrey};
    margin-bottom: 24px; /* mb-4 */
  `

  static FormGroupRow: SFC<HTMLProps<HTMLDivElement>> = ({
    className,
    ...restOfProps
  }) => (
    <div className={cx("form-group row mb-5", className)} {...restOfProps} />
  )

  static ColFormLabel: SFC<HTMLProps<HTMLLabelElement>> = ({
    className,
    ...restOfProps
  }) => (
    <label
      className={cx("col-3 col-form-label col-form-label-lg", className)}
      {...restOfProps}
    />
  )

  static RequiredStar = () => <span className="text-danger mx-1">*</span>

  state: CheckoutFormState = {
    isScheduledDelivery: false,
  }

  handleChoosePaymentMethod = (
    event: SyntheticEvent<HTMLInputElement>,
    newValue: string
  ) => {
    this.setState({paymentMethod: newValue})
  }

  toggleIsScheduledDelivery = () =>
    this.setState(prevState => ({
      isScheduledDelivery: !prevState.isScheduledDelivery,
    }))

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <h2 className="mb-4">Оформление заказа</h2>

        <div className="row mt-3">
          <div className="col-6">
            <CheckoutForm.Subtitle>Доставка</CheckoutForm.Subtitle>

            <CheckoutForm.FormGroupRow>
              <CheckoutForm.ColFormLabel htmlFor="phone">
                Телефон
                <CheckoutForm.RequiredStar />
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
                Имя
                <CheckoutForm.RequiredStar />
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
                Улица
                <CheckoutForm.RequiredStar />
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
                Дом
                <CheckoutForm.RequiredStar />
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
                Квартира
                <CheckoutForm.RequiredStar />
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
            <CheckoutForm.Subtitle>Оплата</CheckoutForm.Subtitle>

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
                    <span className="input-group-text">
                      {this.props.currency}
                    </span>
                  </div>
                </div>
              </div>
            </CheckoutForm.FormGroupRow>

            <CheckoutForm.FormGroupRow>
              <CheckoutForm.ColFormLabel htmlFor="meteors" />
              <div className="col-9">
                <div className="input-group">
                  <input
                    value={this.props.meteors}
                    className="form-control text-right form-control-lg"
                    name="meteors"
                    id="meteors"
                    placeholder="Метеоров"
                    readOnly
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">Метеоров</span>
                  </div>
                </div>
              </div>
            </CheckoutForm.FormGroupRow>
            {this.state.paymentMethod === "cash" && (
              <CheckoutForm.FormGroupRow>
                <CheckoutForm.ColFormLabel htmlFor="apartment">
                  Сдача с
                </CheckoutForm.ColFormLabel>

                <div className="col">
                  <Field
                    component={CustomInput}
                    name="surrender"
                    props={{
                      id: "surrender",
                      type: "text",
                      placeholder: "Сдача",
                      autoComplete: "surrender",
                      className: "form-control-lg",
                    }}
                  />
                </div>
              </CheckoutForm.FormGroupRow>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col">
            <CheckoutForm.Subtitle>Время доставки</CheckoutForm.Subtitle>

            <div className="form-check row mb-3">
              <div className="col-auto">
                <input
                  className="form-check-input"
                  name="scheduled-delivery"
                  type="checkbox"
                  id="scheduled-delivery"
                  checked={this.state.isScheduledDelivery}
                  onChange={this.toggleIsScheduledDelivery}
                />
              </div>

              <div className="col">
                <label
                  className="form-check-label"
                  htmlFor="scheduled-delivery"
                >
                  Запланировать доставку
                </label>
              </div>
            </div>

            <CheckoutForm.FormGroupRow>
              <div className="col">
                <Field
                  component={CustomInput}
                  name="date"
                  props={{
                    id: "date",
                    type: "date",
                    placeholder: "Дата",
                    autoComplete: "date",
                    className: "form-control-lg",
                    disabled: !this.state.isScheduledDelivery,
                  }}
                />
              </div>

              <div className="col">
                <Field
                  component={CustomInput}
                  name="time"
                  props={{
                    id: "time",
                    type: "time",
                    placeholder: "Время",
                    autoComplete: "time",
                    className: "form-control-lg",
                    disabled: !this.state.isScheduledDelivery,
                  }}
                />
              </div>
            </CheckoutForm.FormGroupRow>
          </div>

          <div className="col d-flex flex-column mb-5">
            <CheckoutForm.Subtitle>Комментарий</CheckoutForm.Subtitle>

            <Field
              component={CustomTextarea}
              name="comment"
              props={{
                id: "comment",
                type: "text",
                placeholder: "Комментарий к заказу",
                autoComplete: "comment",
                className: "form-control-lg flex-grow-1",
              }}
            />
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
