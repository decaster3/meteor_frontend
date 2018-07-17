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

          <div className="col">
            <OrderView.Label>Заказ от:</OrderView.Label>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </div>

          <div className="col">
            <OrderView.Label>Статус:</OrderView.Label>{" "}
            {orderStatusTranslation[order.status]}
          </div>

          <div className="col">
            <OrderView.Label>Метод оплаты:</OrderView.Label>{" "}
            {paymentMethodTranslation[order.paymentMethod]}
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
