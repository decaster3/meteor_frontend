import React from "react"
import {
  Order,
  paymentMethodTranslation,
  orderStatusTranslation,
  OrderProduct,
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
    const currency = order.orderProducts[0].product.instances[0].price.currency
    // const total = order.orderProducts
    //   .map(x => x.product.instances[0].price)
    //   .reduce()
    return (
      <div {...restOfProps}>
        <div>
          <div>
            Метод оплаты: {paymentMethodTranslation[order.paymentMethod]}
          </div>
          <div>Статус: {orderStatusTranslation[order.status]}</div>
          <div>Заказ от: {order.createdAt}</div>
        </div>
        <button onClick={this.toggle}>Toggle</button>
        <Collapse isOpen={!this.state.collapsed}>
          {order.orderProducts.map((orderProduct, index) => (
            <OrderHistoryProduct
              key={index}
              product={orderProduct.product}
              addProductToCart={addProductToCart}
            />
          ))}
        </Collapse>
      </div>
    )
  }
}

export default OrderView
