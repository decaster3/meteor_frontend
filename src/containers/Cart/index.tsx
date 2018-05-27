/*
 * User
 */
import * as React from "react"
import {connect} from "react-redux"
import {compose, Dispatch} from "redux"
import {State} from "../../"
import injectReducer from "../../utils/injectReducer"
import reducer from "./reducer"
import {
  selectProducts,
  selectMeteors,
  selectTotal,
  selectPossibleMeteors,
} from "./selectors"
import CartView from "../../views/Cart"
import {
  addProductToCart,
  removeProductFromCart,
  updateTotalCart,
  CartProduct,
} from "./actions"

interface CartProps {
  products: CartProduct[]
  meteors: number
  total: number
  possibleMeteors: number
  removeProductFromCart(product: CartProduct): void
  addProductToCart(product: CartProduct): void
  updateTotalCart(): void
}

const WithCart = (WrappedComponent: React.ComponentType) => {
  return class WithCartContainer extends React.Component<CartProps> {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

const mapStateToProps = (state: State) => {
  return {
    meteors: selectMeteors(state),
    total: selectTotal(state),
    products: selectProducts(state),
    possibleMeteors: selectPossibleMeteors(state),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addProductToCart: (product: CartProduct) =>
      dispatch(addProductToCart(product)),
    removeProductFromCart: (product: CartProduct) =>
      dispatch(removeProductFromCart(product)),
    updateTotalCart: () => dispatch(updateTotalCart()),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(connect(mapStateToProps, mapDispatchToProps), WithCart)
