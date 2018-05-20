import * as React from "react"
import {Category} from "../../containers/Menu/actions"
import CategoryView from "../Category"
import {Status} from "../../constants"
import ProductView from "../Product"
import {Product} from "../../containers/Menu/actions"

interface MenuProps {
  categories: Category[]
  categoriesStatus: string
  getProductsAfterCategoryClick(category: Category): void
}
interface MenuState {
  currentCategory?: Category
  isCategorySelected: boolean
}
export class Menu extends React.Component<MenuProps, MenuState> {
  static getDerivedStateFromProps(nextProps: MenuProps, prevState: MenuState) {
    if (
      nextProps.categoriesStatus === Status.LOADED &&
      !prevState.isCategorySelected &&
      nextProps.categories[0] &&
      nextProps.categories[0].productsStatus === Status.LOADED
    ) {
      return {
        currentCategory: nextProps.categories[0],
        isCategorySelected: true,
      }
    }
    return null
  }
  constructor(props: MenuProps) {
    super(props)
    this.state = {
      isCategorySelected: false,
    }
  }
  setCurrentCategory = (category: Category) => {
    this.setState({
      currentCategory: category,
      isCategorySelected: true,
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
    if (
      this.state.isCategorySelected &&
      this.state.currentCategory &&
      this.state.currentCategory.productsStatus === Status.LOADED &&
      this.state.currentCategory.products
    ) {
      return this.state.currentCategory.products.map(product => (
        <ProductView key={product.id} product={product} />
      ))
    }
    return <p>Loading</p>
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
