import * as React from "react"
import {Row, Col} from "reactstrap"

import {Category} from "../../containers/Menu/actions"
import {Status} from "../../constants"
import ProductCard from "../ProductCard"
import {Product} from "../../containers/Menu/actions"
import {CartProduct} from "../../containers/Cart/actions"
import * as styles from "./index.module.scss"

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
      return {currentCategory: nextProps.categories[0]}
    } else {
      return null
    }
  }

  state: MenuState = {}

  handleCategoryClick = (category: Category) => () => {
    this.props.getProductsAfterCategoryClick(category)
    this.setState({currentCategory: category})
  }

  renderCategories = () => {
    switch (this.props.categoriesStatus) {
      case Status.LOADING:
        return <p>Loading...</p>
      case Status.LOADING_ERROR:
        return <p>Loading error.</p>
      case Status.LOADED:
        return this.props.categories.map(category => (
          <a key={category.id} onClick={this.handleCategoryClick(category)}>
            {category.name}
          </a>
        ))
      default:
        return <p>Something went wrong. Reload the page.</p>
    }
  }

  renderProducts = () => {
    if (this.state.currentCategory) {
      switch (this.state.currentCategory.productsStatus) {
        case Status.LOADING:
          return <p>Loading...</p>
        case Status.LOADING_ERROR:
          return <p>Loading error.</p>
        case Status.LOADED:
          return this.state.currentCategory.products.map(product => (
            <Col xs="3" key={product.id}>
              <ProductCard
                key={product.id}
                product={product}
                addProductToCart={this.props.addProductToCart}
              />
            </Col>
          ))
        default:
          return <p>Something went wrong. Reload the page.</p>
      }
    }
    return <div>Category is not selected.</div>
  }

  render() {
    return (
      <>
        <div className={styles.categoriesBar}>{this.renderCategories()}</div>
        <Row>
          {this.renderProducts()}
          {this.renderProducts()}
          {this.renderProducts()}
          {this.renderProducts()}
        </Row>
      </>
    )
  }
}

export default Menu
