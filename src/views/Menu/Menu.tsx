import React from "react"
import {Row, Col} from "reactstrap"
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

const findCategoryByUrl = (
  url: string | null,
  categories: Category[]
): Category => {
  return categories.find(category => category.url === url) || categories[0]
}

interface MenuProps
  extends ProductsProps,
    GeolocationProps,
    RouteComponentProps<{}> {}

interface MenuState {
  currentSubcategory: Subcategory
}

export class Menu extends React.Component<MenuProps, MenuState> {
  state = {
    currentSubcategory: {id: 0, name: "Все"},
  }

  componentDidMount() {
    this.props.getProducts(
      findCategoryByUrl(
        this.props.location && this.props.location.pathname,
        this.props.categories
      )
    )
  }

  handleChangeSubcategory = (subcategory: Subcategory) =>
    this.setState({currentSubcategory: subcategory})

  Products = () => {
    const currentCategory = findCategoryByUrl(
      this.props.location && this.props.location.pathname,
      this.props.categories
    )
    switch (currentCategory.productsStatus) {
      case Status.LOADING:
        return <p>Loading...</p>
      case Status.LOADING_ERROR:
        return <p>Loading error.</p>
      case Status.LOADED:
        return (
          <Row>
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
                  <Col sm="6" md="4" lg="3" className="my-3">
                    <ProductCard
                      product={product}
                      addProductToCart={this.props.addProductToCart}
                    />
                  </Col>
                </React.Fragment>
              ))}
          </Row>
        )
      default:
        return <p>Something went wrong. Reload the page.</p>
    }
  }

  render() {
    const currentCategory = findCategoryByUrl(
      this.props.location && this.props.location.pathname,
      this.props.categories
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
