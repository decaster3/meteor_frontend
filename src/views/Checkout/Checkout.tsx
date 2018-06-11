import * as React from "react"
import {reduxForm} from "redux-form/immutable"
import * as classnames from "classnames"
import {Field} from "redux-form/immutable"
import {Link} from "react-router-dom"
import {compose} from "redux"
import withCheckout from "../../containers/Checkout"
import CheckoutForm from "./CheckoutForm"
import * as styles from "./Login.module.scss"
import {Address} from "../../containers/Checkout/actions"
import {withUser} from "../../containers/UserSession"
import {fromJS} from "immutable"
import {User} from "../../containers/UserSession/actions"

interface LoginProps {
  isOrderPending: boolean
  userInfo: User
  streets: string[]
  makeOrder(address: Address, name: string, phone: string): void
}
class Login extends React.Component<LoginProps> {
  handleOrderSubmit = (values: any) => {
    const address = {
      street: values.get("street").value,
      building: values.get("building"),
      apartment: values.get("apartment"),
      comment: values.get("comment"),
      cityId: values.get("cityId"),
    }
    this.props.makeOrder(address, values.get("name"), values.get("phone"))
  }

  render() {
    return (
      <div>
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
      </div>
    )
  }
}

export default compose(
  withCheckout,
  withUser
)(Login)
