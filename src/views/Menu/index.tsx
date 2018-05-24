import * as React from "react"
import {Row, Col} from "reactstrap"

import {Category} from "../../containers/Menu/actions"
import {Status} from "../../constants"
import ProductCard from "../ProductCard"
import {Product} from "../../containers/Menu/actions"
import {CartProduct} from "../../containers/Cart/actions"
import * as styles from "./index.module.scss"
import * as _ from "lodash"

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
        return (
          <div className={styles.categoriesBar}>
            {this.props.categories.map(category => (
              <a key={category.id} onClick={this.handleCategoryClick(category)}>
                {category.name}
              </a>
            ))}
          </div>
        )
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
          return (
            <Row>
              {this.state.currentCategory.products.map(product => (
                <React.Fragment key={product.id}>
                  {_.range(8).map((value, index) => (
                    <Col key={index} sm="6" md="4" lg="3">
                      <ProductCard
                        product={product}
                        addProductToCart={this.props.addProductToCart}
                      />
                    </Col>
                  ))}
                </React.Fragment>
              ))}
            </Row>
          )
        default:
          return <p>Something went wrong. Reload the page.</p>
      }
    }
    return <div>Category is not selected.</div>
  }

  render() {
    return (
      <>
        {this.renderCategories()}
        {this.renderProducts()}
      </>
    )
  }
}

export default Menu
