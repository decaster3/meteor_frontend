import * as React from "react"
import {compose} from "redux"
import {fromJS} from "immutable"

import withCheckout from "../../containers/Checkout"
import CheckoutForm from "./CheckoutForm"
import {Address} from "../../containers/Checkout/actions"
import {withUser} from "../../containers/UserSession"
import {User} from "../../containers/UserSession/actions"

interface CheckoutProps {
  isOrderPending: boolean
  userInfo: User
  streets: string[]
  makeOrder(
    address: Address,
    name: string,
    phone: string,
    paymentMethod: string
  ): void
}

class Checkout extends React.Component<CheckoutProps> {
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
  withUser
)(Checkout)
