import React from "react"
import {compose} from "redux"
import {fromJS} from "immutable"
import {withRouter} from "react-router-dom"
import withCart, {CartProps} from "../../containers/Cart"
import withCheckout, {CheckoutProps} from "../../containers/Checkout"
import CheckoutForm from "./CheckoutForm"
import {withUser, UserProps} from "../../containers/UserSession"
import withGeolocation, {GeolocationProps} from "../../containers/Geolocation"

type CheckoutViewProps = CartProps &
  UserProps &
  CheckoutProps &
  GeolocationProps & {history: any}

class Checkout extends React.Component<CheckoutViewProps> {
  handleOrderSubmit = (values: any) => {
    const address = {
      street: values.get("street").value,
      building: values.get("building"),
      apartment: values.get("apartment"),
      comment: values.get("comment"),
    }

    this.props.makeOrder(
      address,
      values.get("name"),
      values.get("phone"),
      values.get("paymentMethod"),
      (id: number, status: boolean, phone: string) =>
        this.props.history.push(`/order/${id}/${status}/${phone}`)
    )
  }

  render() {
    return (
      <CheckoutForm
        currency={this.props.defaultCity.currency}
        isOrderPending={this.props.isOrderPending}
        streets={this.props.streets}
        meteors={this.props.meteors}
        userPhone={this.props.userInfo.phone}
        total={this.props.total}
        initialValues={fromJS({
          phone: this.props.userInfo.phone ? this.props.userInfo.phone : "",
          name: this.props.userInfo.name ? this.props.userInfo.name : "",
        })}
        onSubmit={this.handleOrderSubmit}
      />
    )
  }
}

export default withRouter(
  compose<any>(
    withGeolocation,
    withCheckout,
    withUser,
    withCart
  )(Checkout)
)
