import React from "react"
import _ from "lodash"
import {Category, Subcategory} from "../../containers/Products/actions"
import {Status} from "../../constants"
import withProductCreation from "../../containers/ProductCreation"
import withGeolocation, {GeolocationProps} from "../../containers/Geolocation"
import {compose} from "redux"
import withProducts, {ProductsProps} from "../../containers/Products"
import ProductCard from "../ProductCard"
import SubcategoriesNav from "./SubcategoriesNav"
import CategoriesNav from "./CategoriesNav"
import {withRouter, RouteComponentProps} from "react-router-dom"
import ProductCreation from "./ProductCreation"

const findCategoryByKey = (
  categories: Category[],
  key?: string | null
): Category => {
  return categories.find(category => category.key === key) || categories[0]
}

interface MenuProps
  extends ProductsProps,
    GeolocationProps,
    RouteComponentProps<{category?: string}> {}

interface MenuState {
  currentSubcategory: Subcategory
}

export class Menu extends React.Component<MenuProps, MenuState> {
  state = {
    currentSubcategory: {id: 0, name: "Все"},
  }

  componentDidMount() {
    this.props.getProducts(
      findCategoryByKey(this.props.categories, this.props.match.params.category)
    )
  }

  handleChangeSubcategory = (subcategory: Subcategory) =>
    this.setState({currentSubcategory: subcategory})

  Products = () => {
    const currentCategory = findCategoryByKey(
      this.props.categories,
      this.props.match.params.category
    )
    switch (currentCategory.productsStatus) {
      case Status.LOADING:
        return <p>Loading...</p>
      case Status.LOADING_ERROR:
        return <p>Loading error.</p>
      case Status.LOADED:
        return (
          <div className="row">
            {currentCategory.products
              .filter(
                product =>
                  this.state.currentSubcategory.name === "Все" ||
                  _.includes(
                    product.subcategories,
                    this.state.currentSubcategory
                  )
              )
              .map(product => (
                <React.Fragment key={product.id}>
                  <div className="col-6 col-md-4 col-lg-3 my-3">
                    <ProductCard category={currentCategory} product={product} />
                  </div>
                </React.Fragment>
              ))}
          </div>
        )
      default:
        return <p>Something went wrong. Reload the page.</p>
    }
  }

  render() {
    const currentCategory = findCategoryByKey(
      this.props.categories,
      this.props.match.params.category
    )
    return (
      <>
        <CategoriesNav categories={this.props.categories} />

        <SubcategoriesNav
          handleChangeSubcategory={this.handleChangeSubcategory}
          subcategories={currentCategory.subcategories}
          currentSubcategory={this.state.currentSubcategory}
        />

        <this.Products />

        <ProductCreation />
      </>
    )
  }
}

export default compose(
  withRouter,
  withProducts,
  withGeolocation,
  withProductCreation
)(Menu)
