/*
 * User
 */
import * as React from "react"
import {connect} from "react-redux"
import {compose, Dispatch} from "redux"
import {State} from "../../"
import injectReducer from "../../utils/injectReducer"
import {getCategories} from "./actions"
import reducer from "./reducer"
import {selectCategories, selectCategoriesStatus} from "./selectors"
import {Category} from "./actions"
import MenuView from "../../views/Menu"
import {addProductToCart, CartProduct} from "../Cart/actions"
import {setInviterToken} from "../UserSession/actions"

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

const WithCategories = (WrappedComponent: React.ComponentType) => {
  return class WithCategoriesContainer extends React.Component<
    CategoriesProps
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
  connect(mapStateToProps, mapDispatchToPropsCategories),
  WithCategories
)