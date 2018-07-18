import React from "react"
import {
  Order,
  paymentMethodTranslation,
  orderStatusTranslation,
} from "../../containers/UserSession/actions"
import OrderHistoryProduct from "./OrderHistoryProduct"
import {CartProduct} from "../../containers/Cart/actions"
import {Collapse} from "reactstrap"
import Icon from "react-fa"
import {styled, ThemeProps, withTheme} from "../App/Theme"
import {cx, css} from "../../../node_modules/emotion"

interface OrderViewProps extends React.HTMLProps<HTMLDivElement>, ThemeProps {
  order: Order
  addProductToCart(poduct: CartProduct): void
}

interface OrderViewState {
  collapsed: boolean
}

class OrderView extends React.Component<OrderViewProps, OrderViewState> {
  static Label = styled("small")`
    color: ${props => props.theme.lighterGrey};
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
      theme,
      ...restOfProps
    } = this.props
    return (
      <div
        className={cx(
          css`
            padding: 16px;
            margin: 16px 0;
            background: ${this.props.theme.darkBlue};
          `,
          className
        )}
        {...restOfProps}
      >
        <div
          className="row text-uppercase align-items-center"
          onClick={this.toggle}
        >
          <div className="col-1 text-center font-weight-bold">
            <span className="h1 mb-0">
              <Icon name={this.state.collapsed ? "angle-down" : "angle-up"} />
            </span>
          </div>

          <div className="col-2 text-center">
            <OrderView.Label>Заказ № </OrderView.Label>
            <OrderView.Value>{order.id}</OrderView.Value>
          </div>

          <div className="col">
            <OrderView.Label>Дата: </OrderView.Label>
            <OrderView.Value>
              {new Date(order.createdAt).toLocaleDateString()}
            </OrderView.Value>
          </div>

          <div className="col">
            <OrderView.Label>Время: </OrderView.Label>
            <OrderView.Value>
              {new Date(order.createdAt).toLocaleTimeString()}
            </OrderView.Value>
          </div>

          <div className="col">
            <OrderView.Label>Статус: </OrderView.Label>
            <OrderView.Value>
              {orderStatusTranslation[order.status]}
            </OrderView.Value>
          </div>

          <div className="col">
            <OrderView.Label>Метод оплаты: </OrderView.Label>
            <OrderView.Value>
              {paymentMethodTranslation[order.paymentMethod]}
            </OrderView.Value>
          </div>
        </div>

        <Collapse isOpen={!this.state.collapsed}>
          <div className="mt-5">
            {order.orderProducts.map((orderProduct, index) => (
              <OrderHistoryProduct
                key={index}
                product={orderProduct}
                addProductToCart={addProductToCart}
              />
            ))}
          </div>
        </Collapse>
      </div>
    )
  }
}

export default withTheme(OrderView)
