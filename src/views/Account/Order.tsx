import React from "react"
import {
  Order,
  paymentMethodTranslation,
  orderStatusTranslation,
} from "../../containers/UserSession/actions"
import OrderHistoryProduct from "./OrderHistoryProduct"
import {CartProduct} from "../../containers/Cart/actions"
import {Collapse} from "reactstrap"

interface OrderViewProps extends React.HTMLProps<HTMLDivElement> {
  order: Order
  addProductToCart(poduct: CartProduct): void
}

interface OrderViewState {
  collapsed: boolean
}

class OrderView extends React.Component<OrderViewProps, OrderViewState> {
  state: OrderViewState = {collapsed: true}

  toggle = () => this.setState(prevState => ({collapsed: !prevState.collapsed}))

  render() {
    const {order, addProductToCart, children, ...restOfProps} = this.props
    // const currency = order.orderProducts[0].product.instances[0].price.currency
    // const total = order.orderProducts
    //   .map(x => x.product.instances[0].price)
    //   .reduce()
    return (
      <div {...restOfProps}>
        <div className="row">
          <div className="col">
            <button onClick={this.toggle}>Toggle</button>
          </div>

          <div className="col">
            Метод оплаты: {paymentMethodTranslation[order.paymentMethod]}
          </div>

          <div className="col">
            Статус: {orderStatusTranslation[order.status]}
          </div>

          <div className="col">
            Заказ от: {new Date(order.createdAt).toLocaleString()}
          </div>
        </div>
        <Collapse isOpen={!this.state.collapsed}>
          {order.orderProducts.map((orderProduct, index) => (
            <OrderHistoryProduct
              key={index}
              product={orderProduct}
              addProductToCart={addProductToCart}
            />
          ))}
        </Collapse>
      </div>
    )
  }
}

export default OrderView
