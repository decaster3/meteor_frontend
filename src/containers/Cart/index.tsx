import React from "react"
import {connect} from "react-redux"
import {compose, Dispatch} from "redux"
import {State} from "../.."
import injectReducer from "../../utils/injectReducer"
import reducer from "./reducer"
import {
  selectProducts,
  selectMeteors,
  selectTotal,
  selectPossibleMeteors,
} from "./selectors"
import {
  addProductToCart,
  removeProductFromCart,
  updateTotalCart,
  CartProduct,
} from "./actions"

export interface CartStateProps {
  products: CartProduct[]
  meteors: number
  total: number
  possibleMeteors: number
}

export interface CartDispatchProps {
  removeProductFromCart(product: CartProduct): void
  addProductToCart(product: CartProduct): void
  updateTotalCart(): void
}

export interface CartProps extends CartStateProps, CartDispatchProps {}

const mapStateToProps = (state: State): CartStateProps => ({
  meteors: selectMeteors(state),
  total: selectTotal(state),
  products: selectProducts(state),
  possibleMeteors: selectPossibleMeteors(state),
})

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
