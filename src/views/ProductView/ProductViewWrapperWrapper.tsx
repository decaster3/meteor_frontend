import React, {Component} from "react"
import withProducts, {ProductsProps} from "../../containers/Products"
import withCategories, {CategoriesProps} from "../../containers/Category"
import {withRouter, RouteComponentProps, Route} from "react-router"
import {compose} from "redux"
import {Category} from "../../containers/Products/actions"
import NotFound from "../NotFound"
import {Status} from "../../constants"
import ProductViewWrapper from "./ProductViewWrapper"

const findCategoryByKey = (
  categories: Category[],
  key?: string | null
): Category =>
  categories.find(category => category.key === key) || categories[0]

class ProductViewWrapperWrapper extends Component<
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
    if (category.products) {
      const product = category.products.find(
        x => x.id.toString() === this.props.match.params.productId
      )
      return product ? (
        <ProductViewWrapper product={product} category={category} />
      ) : (
        <Route component={NotFound} />
      )
    } else if (category.productsStatus === Status.LOADING) {
      return <p>Загрузка...</p>
    } else {
      return <p>Ошибка загрузки...</p>
    }
  }
}

export default compose(
  withRouter,
  withCategories,
  withProducts
)(ProductViewWrapperWrapper)
