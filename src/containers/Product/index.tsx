/*
 * User
 */
import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {State} from "../.."
import injectReducer from "../../utils/injectReducer"
import {getProducts, Category} from "./actions"
import reducer from "./reducer"
import {selectCategories, selectCurrentCategoryId} from "./selectors"
import {addProductToCart, CartProduct} from "../Cart/actions"

interface CategoriesStateProps {
  categories: Category[]
  currentCategoryId: number
  inviterToken?: string
}

interface CategoriesDispatchProps {
  addProductToCart(product: CartProduct): void
  getProducts(category: Category): void
}

export interface CategoriesProps
  extends CategoriesStateProps,
    CategoriesDispatchProps {}

const withProductsAndCategories = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class WithProductsAndCategoriesContainer extends React.Component<
    CategoriesProps & P
  > {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

const mapDispatchToPropsProductsAndCategories = (
  dispatch: any
): CategoriesDispatchProps => {
  return {
    addProductToCart: (product: CartProduct) =>
      dispatch(addProductToCart(product)),
    getProducts: (category: Category) => dispatch(getProducts(category)),
  }
}

const mapStateToProps = (state: State): CategoriesStateProps => ({
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
  withProductsAndCategories
)
