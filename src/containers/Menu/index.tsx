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
} from "./actions"
import reducer from "./reducer"
import {selectCategories, selectCategoriesStatus} from "./selectors"
import {Category} from "./actions"
import MenuView from "../../views/Menu"
import {addProductToCart, CartProduct} from "../Cart/actions"

interface MenuProps {
  categories: Category[]
  categoriesStatus: string
  configureCategoriesProducts(): void
  addProductToCart(product: CartProduct): void
  getProductsAfterCategoryClick(category: Category): void
}

export class Menu extends React.Component<MenuProps> {
  componentDidMount() {
    this.props.configureCategoriesProducts()
  }

  render() {
    return (
      <MenuView
        categories={this.props.categories}
        categoriesStatus={this.props.categoriesStatus}
        getProductsAfterCategoryClick={this.props.getProductsAfterCategoryClick}
        addProductToCart={this.props.addProductToCart}
      />
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    categories: selectCategories(state),
    categoriesStatus: selectCategoriesStatus(state),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addProductToCart: (product: CartProduct) =>
      dispatch(addProductToCart(product)),
    configureCategoriesProducts: () => dispatch(configureCategoriesProducts()),
    getProductsAfterCategoryClick: (category: Category) =>
      dispatch(getProductsAfterCategoryClick(category)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({key: "menu", reducer})

export default compose(withReducer, withConnect)(Menu)
