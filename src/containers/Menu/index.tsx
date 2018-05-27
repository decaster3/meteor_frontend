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

const WithProductsAndCategories = (WrappedComponent: React.ComponentType) => {
  return class WithProductsAndCategoriesContainer extends React.Component<
    ProductsAndCategoriesProps
  > {
    componentDidMount() {
      this.props.configureCategoriesProducts()
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

const WithCategories = (WrappedComponent: React.ComponentType) => {
  return class WithCategoriesContainer extends React.Component<
    CategoriesProps
  > {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

const WithInviterToken = (WrappedComponent: React.ComponentType) => {
  return class WithInviterTokenContainer extends React.Component<
    CategoriesProps
  > {
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

const mapDispatchToPropsProductsAndCategories = (dispatch: any) => {
  return {
    addProductToCart: (product: CartProduct) =>
      dispatch(addProductToCart(product)),
    configureCategoriesProducts: () => dispatch(configureCategoriesProducts()),
    getProductsAfterCategoryClick: (category: Category) =>
      dispatch(getProductsAfterCategoryClick(category)),
  }
}

const mapDispatchToPropsInviterToken = (dispatch: any) => {
  return {
    setInviterToken: (inviterToken: string) =>
      dispatch(setInviterToken(inviterToken)),
  }
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

const withReducer = injectReducer({key: "menu", reducer})

export const withProductsAndCategories = compose(
  withReducer,
  connect(mapStateToProps, mapDispatchToPropsProductsAndCategories),
  WithProductsAndCategories
)

export const withCategories = compose(
  withReducer,
  connect(mapStateToProps, mapDispatchToPropsCategories),
  WithCategories
)

export const withInviterToken = compose(
  connect(null, mapDispatchToPropsInviterToken),
  WithInviterToken
)
