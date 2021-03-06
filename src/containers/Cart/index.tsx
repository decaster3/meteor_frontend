import {connect} from "react-redux"
import {selectProducts, selectMeteors, selectTotal} from "./selectors"
import {
  addProductToCart,
  removeProductFromCart,
  updateTotalCart,
  changeMeteors,
  CartProduct,
  deleteProduct,
} from "./actions"

interface CartStateProps {
  products: CartProduct[]
  meteors: number
  total: number
}

interface CartDispatchProps {
  changeMeteors(meteors: number): void
  removeProductFromCart(product: CartProduct): void
  deleteProduct(product: CartProduct): void
  addProductToCart(product: CartProduct): void
  updateTotalCart(): void
}

export interface CartProps extends CartStateProps, CartDispatchProps {}

const mapStateToProps = (state: any): CartStateProps => ({
  meteors: selectMeteors(state),
  total: selectTotal(state),
  products: selectProducts(state),
})

const mapDispatchToProps = (dispatch: any): CartDispatchProps => ({
  addProductToCart: (product: CartProduct) =>
    dispatch(addProductToCart(product)),
  changeMeteors: (meteors: number) => dispatch(changeMeteors(meteors)),
  removeProductFromCart: (product: CartProduct) =>
    dispatch(removeProductFromCart(product)),
  deleteProduct: (product: CartProduct) => dispatch(deleteProduct(product)),
  updateTotalCart: () => dispatch(updateTotalCart()),
})

export interface CartProps extends CartStateProps, CartDispatchProps {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
