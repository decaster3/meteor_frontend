/*
 * User
 */
import React from "react"
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

interface CartStateProps {
  products: CartProduct[]
  meteors: number
  total: number
  possibleMeteors: number
}

const mapStateToProps = (state: State): CartStateProps => ({
  meteors: selectMeteors(state),
  total: selectTotal(state),
  products: selectProducts(state),
  possibleMeteors: selectPossibleMeteors(state),
})

interface CartDispatchProps {
  removeProductFromCart(product: CartProduct): void
  addProductToCart(product: CartProduct): void
  updateTotalCart(): void
}

const mapDispatchToProps = (dispatch: any): CartDispatchProps => ({
  addProductToCart: (product: CartProduct) =>
    dispatch(addProductToCart(product)),
  removeProductFromCart: (product: CartProduct) =>
    dispatch(removeProductFromCart(product)),
  updateTotalCart: () => dispatch(updateTotalCart()),
})

export interface CartProps extends CartStateProps, CartDispatchProps {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
