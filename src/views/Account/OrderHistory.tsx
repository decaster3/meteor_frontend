import React from "react"
import {compose} from "redux"
import {withUser, UserProps} from "../../containers/UserSession"
import withCart, {CartProps} from "../../containers/Cart"
import {
  paymentMethodTranslation,
  orderStatusTranslation,
} from "../../containers/UserSession/actions"
import {Status} from "../../constants"
import {Link as ReactRouterLink} from "react-router-dom"
import {ThemeProps, styled, withTheme} from "../App/emotion"
import Order from "./Order"

interface AccountOrderHistoryProps extends UserProps, CartProps, ThemeProps {}

const Link = styled(ReactRouterLink)`
  color: ${props => props.theme.orange};
  text-decoration: none;
  :focus,
  :hover,
  :active {
    color: ${props => props.theme.redOrange};
    text-decoration: none;
  }
`

class AccountOrderHistory extends React.Component<AccountOrderHistoryProps> {
  render() {
    switch (this.props.userInfo.userInfoStatus) {
      case Status.LOADING:
        return <p>Loading...</p>
      case Status.LOADING_ERROR:
        return (
          <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
            <p className="h2 mb-5">
              Ошибка загрузки. Проверьте соединение с интернетом и
              перезагрузите страницу
            </p>
          </div>
        )
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
          return (
            <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
              <p className="h2 mb-5">Здесь будет отображена история заказов</p>
              <p>
                <Link to="/" className="text-uppercase font-weight-bold">
                  Перейти к меню
                </Link>
              </p>
            </div>
          )
        }
      default:
        return (
          <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
            <p className="h2 mb-5">
              Ошибка загрузки. Проверьте соединение с интернетом и
              перезагрузите страницу
            </p>
          </div>
        )
    }
  }
}

export default compose(
  withCart,
  withUser,
  withTheme
)(AccountOrderHistory)
