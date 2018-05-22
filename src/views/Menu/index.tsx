import * as React from "react"
import {Category} from "../../containers/Menu/actions"
import CategoryView from "../Category"
import {Status} from "../../constants"
import ProductView from "../Product"
import {Product} from "../../containers/Menu/actions"
import {CartProduct} from "../../containers/Cart/actions"

interface MenuProps {
  categories: Category[]
  categoriesStatus: string
  getProductsAfterCategoryClick(category: Category): void
  addProductToCart(product: CartProduct): void
}
interface MenuState {
  currentCategory?: Category
}
export class Menu extends React.Component<MenuProps, MenuState> {
  static getDerivedStateFromProps(nextProps: MenuProps, prevState: MenuState) {
    if (
      nextProps.categoriesStatus === Status.LOADED &&
      !prevState.currentCategory &&
      nextProps.categories[0] &&
      nextProps.categories[0].productsStatus === Status.LOADED
    ) {
      return {
        currentCategory: nextProps.categories[0],
      }
    }
    return null
  }
  constructor(props: MenuProps) {
    super(props)
    this.state = {}
  }
  setCurrentCategory = (category: Category) => {
    this.setState({
      currentCategory: category,
    })
  }

  renderCategories = () => {
    switch (this.props.categoriesStatus) {
      case Status.LOADING:
        return <p>Loading</p>
      case Status.LOADING_ERROR:
        return <p>Loading error</p>
      case Status.LOADED:
        return this.props.categories.map(category => (
          <CategoryView
            key={category.id}
            category={category}
            setCurrentCategory={this.setCurrentCategory}
            getProductsAfterCategoryClick={
              this.props.getProductsAfterCategoryClick
            }
          />
        ))
      default:
        return <p>Something get wrong, reload page</p>
    }
  }

  renderProducts = () => {
    if (this.state.currentCategory) {
      switch (this.state.currentCategory.productsStatus) {
        case Status.LOADING:
          return <p>Loading</p>
        case Status.LOADING_ERROR:
          return <p>Loading error</p>
        case Status.LOADED:
          return this.state.currentCategory.products.map(product => (
            <ProductView
              key={product.id}
              product={product}
              addProductToCart={this.props.addProductToCart}
            />
          ))
        default:
          return <p>Something get wrong, reload page</p>
      }
    }
    return <div>category is not selected</div>
  }

  render() {
    return (
      <div>
        {this.renderCategories()}
        {this.renderProducts()}
      </div>
    )
  }
}

export default Menu
