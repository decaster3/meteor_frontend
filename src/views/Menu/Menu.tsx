import * as React from "react"
import {Row, Col} from "reactstrap"
import * as _ from "lodash"
import * as classnames from "classnames"

import {Category} from "../../containers/Product/actions"
import {Status} from "../../constants"
import ProductCard from "../ProductCard"
import {CartProduct} from "../../containers/Cart/actions"
import * as styles from "./Menu.module.scss"
import meteorSymbol from "../../assets/logo_meteor.png"
import {compose} from "redux"
import withCategories from "../../containers/Product"
import {JS_HREF} from "../App/Theme"

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
          <Row className="align-items-center justify-content-around py-3">
            {this.props.categories.map(category => (
              <div
                className={classnames(styles.categoryLinkWrapper, {
                  [styles.active]:
                    this.state.currentCategory &&
                    category.id === this.state.currentCategory.id,
                })}
                key={category.id}
              >
                <a href={JS_HREF} onClick={this.handleCategoryClick(category)}>
                  <img src={meteorSymbol} />
                  <span>{category.name}</span>
                </a>
              </div>
            ))}
          </Row>
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
                  {_.range(7).map((value, index) => (
                    <Col key={index} sm="6" md="4" lg="3" className="my-3">
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

export default compose(withCategories)(Menu)
