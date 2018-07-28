import {connect} from "react-redux"
import {compose} from "redux"
import injectReducer from "../../utils/injectReducer"
import {getProducts, Category} from "./actions"
import reducer from "./reducer"
import {selectCategories, selectCurrentCategoryId} from "./selectors"
import {addProductToCart, CartProduct} from "../Cart/actions"

interface ProductsStateProps {
  categories: Category[]
  currentCategoryId: number
}

interface ProductsDispatchProps {
  addProductToCart(product: CartProduct): void
  getProducts(category: Category): void
}

export interface ProductsProps
  extends ProductsStateProps,
    ProductsDispatchProps {}

const mapDispatchToProductsProps = (dispatch: any): ProductsDispatchProps => {
  return {
    addProductToCart: (product: CartProduct) =>
      dispatch(addProductToCart(product)),
    getProducts: (category: Category) => dispatch(getProducts(category)),
  }
}

const mapStateToProductsProps = (state: any): ProductsStateProps => ({
  categories: selectCategories(state),
  currentCategoryId: selectCurrentCategoryId(state),
})

const withReducer = injectReducer({key: "products", reducer})

export default compose(
  withReducer,
  connect(
    mapStateToProductsProps,
    mapDispatchToProductsProps
  )
)
