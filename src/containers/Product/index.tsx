/*
 * User
 */
import * as React from "react"
import {connect} from "react-redux"
import {compose, Dispatch} from "redux"
import {State} from "../../"
import injectReducer from "../../utils/injectReducer"
import {
  configureCategoriesProducts,
  getProductsAfterCategoryClick,
  getCategories,
} from "./actions"
import reducer from "./reducer"
import {selectCategories, selectCategoriesStatus} from "./selectors"
import {Category} from "./actions"
import MenuView from "../../views/Menu"
import {addProductToCart, CartProduct} from "../Cart/actions"
import {setInviterToken} from "../UserSession/actions"

interface CategoriesStateProps {
  categories: Category[]
  categoriesStatus: string
  inviterToken?: string
}

interface CategoriesDispatchProps {
  configureCategoriesProducts(): void
  addProductToCart(product: CartProduct): void
  getProductsAfterCategoryClick(category: Category): void
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
    componentDidMount() {
      this.props.configureCategoriesProducts()
    }
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
    configureCategoriesProducts: () => dispatch(configureCategoriesProducts()),
    getProductsAfterCategoryClick: (category: Category) =>
      dispatch(getProductsAfterCategoryClick(category)),
  }
}

const mapStateToProps = (state: State): CategoriesStateProps => ({
  categories: selectCategories(state),
  categoriesStatus: selectCategoriesStatus(state),
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
