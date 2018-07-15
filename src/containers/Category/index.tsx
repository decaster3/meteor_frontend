/*
 * User
 */
import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {State} from "../../"
import injectReducer from "../../utils/injectReducer"
import {getCategories, Category} from "./actions"
import reducer from "./reducer"
import {selectCategories, selectCategoriesStatus} from "./selectors"
import {CartProduct} from "../Cart/actions"

interface ProductsAndCategoriesProps {
  categories: Category[]
  categoriesStatus: string
  configureCategoriesProducts(): void
  addProductToCart(product: CartProduct): void
  getProductsAfterCategoryClick(category: Category): void
}

interface CategoriesProps {
  categories: Category[]
  categoriesStatus: string
  getCategories(): void
}

const withCategories = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class WithCategoriesContainer extends React.Component<
    CategoriesProps & P
  > {
    componentDidMount() {
      this.props.getCategories()
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

interface MenuStateProps {
  categories: Category[]
  categoriesStatus: string
  inviterToken?: string
}

const mapDispatchToPropsCategories = (dispatch: any) => {
  return {
    getCategories: () => dispatch(getCategories()),
  }
}

const mapStateToProps = (state: State): MenuStateProps => ({
  categories: selectCategories(state),
  categoriesStatus: selectCategoriesStatus(state),
})

const withReducer = injectReducer({key: "categories", reducer})

export default compose(
  withReducer,
  connect(
    mapStateToProps,
    mapDispatchToPropsCategories
  ),
  withCategories
)
