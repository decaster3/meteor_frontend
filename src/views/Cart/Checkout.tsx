import React from "react"
import {compose} from "redux"
import {fromJS} from "immutable"

import withCart, {CartProps} from "../../containers/Cart"
import withCheckout, {CheckoutProps} from "../../containers/Checkout"
import CheckoutForm from "./CheckoutForm"
import {withUser, UserProps} from "../../containers/UserSession"

type CheckoutViewProps = CartProps & UserProps & CheckoutProps

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
      values.get("paymentMethod")
    )
  }

  render() {
    return (
      <CheckoutForm
        isOrderPending={this.props.isOrderPending}
        streets={this.props.streets}
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

export default compose(
  withCheckout,
  withUser,
  withCart
)(Checkout)
