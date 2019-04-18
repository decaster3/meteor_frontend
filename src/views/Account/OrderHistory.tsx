import React from "react"
import {Link as ReactRouterLink} from "react-router-dom"
import {compose} from "redux"
import {Status} from "../../constants"
import withCart, {CartProps} from "../../containers/Cart"
import withGeolocation, {GeolocationProps} from "../../containers/Geolocation"
import {UserProps, withUser} from "../../containers/UserSession"
import {styled, theme} from "../App/emotion"
import Order from "./Order"

type AccountOrderHistoryProps = UserProps & CartProps & GeolocationProps

const Link = styled(ReactRouterLink)`
  color: ${theme.orange};
  text-decoration: none;
  :focus,
  :hover,
  :active {
    color: ${theme.redOrange};
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
              Ошибка загрузки. Проверьте соединение с интернетом и перезагрузите
              страницу
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
              Ошибка загрузки. Проверьте соединение с интернетом и перезагрузите
              страницу
            </p>
          </div>
        )
    }
  }
}

export default compose(
  withGeolocation,
  withCart,
  withUser
)(AccountOrderHistory)
