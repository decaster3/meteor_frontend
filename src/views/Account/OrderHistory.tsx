import React from "react"
import {compose} from "redux"
import {withUser, UserProps} from "../../containers/UserSession"
import withCart, {CartProps} from "../../containers/Cart"
import {
  paymentMethodTranslation,
  orderStatusTranslation,
} from "../../containers/UserSession/actions"
import {Status} from "../../constants"
import OrderHistoryProduct from "./OrderHistoryProduct"
import Order from "./Order"

interface AccountOrderHistoryProps extends UserProps, CartProps {}

class AccountOrderHistory extends React.Component<AccountOrderHistoryProps> {
  render() {
    switch (this.props.userInfo.userInfoStatus) {
      case Status.LOADING:
        return <p>Loading...</p>
      case Status.LOADING_ERROR:
        return <p>Loading error.</p>
      case Status.LOADED:
        if (this.props.userInfo.orders.length > 0) {
          return this.props.userInfo.orders.map(order => (
            <Order
              key={order.id}
              order={order}
              addProductToCart={this.props.addProductToCart}
            />
          ))
        } else {
          return <div>Здесь будет отображена история заказов</div>
        }
      default:
        return <p>Something went wrong. Reload the page.</p>
    }
  }
}

export default compose(
  withCart,
  withUser
)(AccountOrderHistory)
