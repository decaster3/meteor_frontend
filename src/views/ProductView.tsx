import React, {SFC, Component} from "react"
import withProducts, {ProductsProps} from "../containers/Products"
import withCategories, {CategoriesProps} from "../containers/Category"
import {withRouter, RouteComponentProps, Route} from "react-router"
import {compose} from "redux"
import {Category} from "../containers/Products/actions"
import ProductCard from "./ProductCard"
import NotFound from "./NotFound"
import {Status} from "../constants"

const findCategoryByKey = (
  categories: Category[],
  key?: string | null
): Category => {
  return categories.find(category => category.key === key) || categories[0]
}

class ProductView extends Component<
  ProductsProps &
    CategoriesProps &
    RouteComponentProps<{category?: string; productId?: string}>
> {
  componentDidMount() {
    this.props.getProducts(
      findCategoryByKey(this.props.categories, this.props.match.params.category)
    )
  }
  render() {
    const category = findCategoryByKey(
      this.props.categories,
      this.props.match.params.category
    )
    switch (category.productsStatus) {
      case Status.LOADING:
        return <p>Loading...</p>
      case Status.LOADING_ERROR:
        return <p>Loading error.</p>
      case Status.LOADED: {
        const product = category.products.find(
          x => x.id.toString() === this.props.match.params.productId
        )
        return product ? (
          <ProductCard product={product} />
        ) : (
          <Route component={NotFound} />
        )
      }
      default:
        return <p>Something went wrong. Reload the page.</p>
    }
  }
}

export default compose(
  withRouter,
  withCategories,
  withProducts
)(ProductView)
