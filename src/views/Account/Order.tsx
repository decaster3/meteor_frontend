import {cx} from "emotion"
import React from "react"
import Icon from "react-fa"
import {Collapse} from "reactstrap"
import {CartProduct} from "../../containers/Cart/actions"
import {
  Order,
  orderStatusTranslation,
  paymentMethodTranslation,
} from "../../containers/UserSession/actions"
import {styled, theme} from "../App/emotion"
import OrderHistoryProduct from "./OrderHistoryProduct"

interface OrderViewProps extends React.HTMLProps<HTMLDivElement> {
  order: Order
  addProductToCart(poduct: CartProduct): void
}

interface OrderViewState {
  collapsed: boolean
}

class OrderView extends React.Component<OrderViewProps, OrderViewState> {
  static Label = styled("small")`
    color: ${theme.lighterGrey};
    white-space: nowrap;
  `

  static Value = styled("p")`
    white-space: nowrap;
    margin-bottom: 0;
  `

  state: OrderViewState = {collapsed: true}

  toggle = () => this.setState(prevState => ({collapsed: !prevState.collapsed}))

  render() {
    const {
      order,
      addProductToCart,
      children,
      className,
      ...restOfProps
    } = this.props
    return (
      <div
        className={cx("p-3 my-3 mx-0 bg-darkblue", className)}
        {...restOfProps}
      >
        <div
          className="row text-uppercase align-items-center"
          onClick={this.toggle}
        >
          <div className="col-6 col-sm-4 col-md-3">
            <div className="row text-center text-sm-left">
              <div className="col-12 col-sm-6 order-2 order-sm-1">
                <span className="h1 mb-0 font-weight-bold">
                  <Icon
                    name={this.state.collapsed ? "angle-down" : "angle-up"}
                  />
                </span>
              </div>

              <div className="col-12 col-sm-6 order-1 order-sm-2">
                <OrderView.Label>Заказ № </OrderView.Label>
                <OrderView.Value>{order.id}</OrderView.Value>
              </div>
            </div>
          </div>

          <div className="col-6 col-sm">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-3">
                <OrderView.Label>Дата: </OrderView.Label>
                <OrderView.Value>
                  {new Date(order.createdAt).toLocaleDateString()}
                </OrderView.Value>
              </div>

              <div className="col-12 col-sm-6 col-md-3">
                <OrderView.Label>Время: </OrderView.Label>
                <OrderView.Value>
                  {new Date(order.createdAt).toLocaleTimeString()}
                </OrderView.Value>
              </div>

              <div className="col-12 col-sm-6 col-md-3">
                <OrderView.Label>Статус: </OrderView.Label>
                <OrderView.Value>
                  {orderStatusTranslation[order.status]}
                </OrderView.Value>
              </div>

              <div className="col-12 col-sm-6 col-md-3">
                <OrderView.Label>Метод оплаты: </OrderView.Label>
                <OrderView.Value>
                  {paymentMethodTranslation[order.paymentMethod]}
                </OrderView.Value>
              </div>
            </div>
          </div>
        </div>

        <Collapse isOpen={!this.state.collapsed}>
          <div className="mt-5">
            {order.orderProducts.map((orderProduct, index) => (
              <OrderHistoryProduct
                key={index}
                // @ts-ignore
                product={orderProduct}
                orderCityId={this.props.order.cityId}
                addProductToCart={addProductToCart}
              />
            ))}
          </div>
        </Collapse>
      </div>
    )
  }
}

export default OrderView
