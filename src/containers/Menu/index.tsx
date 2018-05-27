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
import {setInviterToken} from "../UserSession/actions"

// export class Menu extends React.Component<MenuProps> {
export class Menu extends React.Component<MenuStateProps & MenuDispatchProps> {
  componentDidMount() {
    if (this.props.inviterToken) {
      this.props.setInviterToken(this.props.inviterToken)
    }
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

interface MenuStateProps {
  categories: Category[]
  categoriesStatus: string
  inviterToken?: string
}

const mapStateToProps = (state: State): MenuStateProps => ({
  categories: selectCategories(state),
  categoriesStatus: selectCategoriesStatus(state),
})

interface MenuDispatchProps {
  configureCategoriesProducts(): void
  addProductToCart(product: CartProduct): void
  setInviterToken(inviterToken: string): void
  getProductsAfterCategoryClick(category: Category): void
}

const mapDispatchToProps = (dispatch: any): MenuDispatchProps => ({
  addProductToCart: (product: CartProduct) =>
    dispatch(addProductToCart(product)),
  setInviterToken: (inviterToken: string) =>
    dispatch(setInviterToken(inviterToken)),
  configureCategoriesProducts: () => dispatch(configureCategoriesProducts()),
  getProductsAfterCategoryClick: (category: Category) =>
    dispatch(getProductsAfterCategoryClick(category)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({key: "menu", reducer})

export default compose(withReducer, withConnect)(Menu)
