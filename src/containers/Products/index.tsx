import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {State} from "../.."
import injectReducer from "../../utils/injectReducer"
import {getProducts, Category} from "./actions"
import reducer from "./reducer"
import {selectCategories, selectCurrentCategoryId} from "./selectors"
import {addProductToCart, CartProduct} from "../Cart/actions"

interface ProductsStateProps {
  categories: Category[]
  currentCategoryId: number
  inviterToken?: string
}

interface ProductsDispatchProps {
  addProductToCart(product: CartProduct): void
  getProducts(category: Category): void
}

export interface ProductsProps
  extends ProductsStateProps,
    ProductsDispatchProps {}

const withProducts = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class WithProductsAndCategoriesContainer extends React.Component<
    ProductsProps & P
  > {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

const mapDispatchToPropsProductsAndCategories = (
  dispatch: any
): ProductsDispatchProps => {
  return {
    addProductToCart: (product: CartProduct) =>
      dispatch(addProductToCart(product)),
    getProducts: (category: Category) => dispatch(getProducts(category)),
  }
}

const mapStateToProps = (state: State): ProductsStateProps => ({
  categories: selectCategories(state),
  currentCategoryId: selectCurrentCategoryId(state),
})

const withReducer = injectReducer({key: "products", reducer})

export default compose(
  withReducer,
  connect(
    mapStateToProps,
    mapDispatchToPropsProductsAndCategories
  ),
  withProducts
)
