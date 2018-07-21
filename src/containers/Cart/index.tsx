import {connect} from "react-redux"
import {State} from "../.."
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
  changeMeteors,
  CartProduct,
} from "./actions"

interface CartStateProps {
  products: CartProduct[]
  meteors: number
  total: number
  possibleMeteors: number
}

interface CartDispatchProps {
  changeMeteors(meteors: number): void
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
  changeMeteors: (meteors: number) => dispatch(changeMeteors(meteors)),
  removeProductFromCart: (product: CartProduct) =>
    dispatch(removeProductFromCart(product)),
  updateTotalCart: () => dispatch(updateTotalCart()),
})

export interface CartProps extends CartStateProps, CartDispatchProps {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
