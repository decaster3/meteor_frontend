import React from "react"
import {compose} from "redux"
import {withUser} from "../../containers/UserSession"
import withCart from "../../containers/Cart"
import {
  UserInformation,
  OrderProduct,
} from "../../containers/UserSession/actions"
import {Status} from "../../constants"
import OrderProductView from "./OrderProduct"
import {CartProduct} from "../../containers/Cart/actions"

interface AccountOrderHistoryProps {
  userInfo: UserInformation
  addProductToCart(product: CartProduct): void
}

class AccountOrderHistory extends React.Component<AccountOrderHistoryProps> {
  renderOrderHistory = () => {
    switch (this.props.userInfo.userInfoStatus) {
      case Status.LOADING:
        return <p>Loading...</p>
      case Status.LOADING_ERROR:
        return <p>Loading error.</p>
      case Status.LOADED:
        if (this.props.userInfo.orders.length > 0) {
          return this.props.userInfo.orders.map(el => (
            <div key={el.id}>
              <div>
                {el.paymentMethod}
                {el.status}
              </div>
              {el.orderProducts.map((orderProduct: OrderProduct) => (
                <OrderProductView
                  key={orderProduct.product.id}
                  product={orderProduct.product}
                  addProductToCart={this.props.addProductToCart}
                />
              ))}
            </div>
          ))
        } else {
          return <div>Здесь будет отображена история заказов</div>
        }
      default:
        return <p>Something went wrong. Reload the page.</p>
    }
  }

  render() {
    return <>{this.renderOrderHistory()}</>
  }
}

export default compose(
  withCart,
  withUser
)(AccountOrderHistory)
