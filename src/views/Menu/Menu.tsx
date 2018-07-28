import React from "react"
import {Row, Col} from "reactstrap"
import _ from "lodash"
import {Category, Subcategory} from "../../containers/Products/actions"
import {Status} from "../../constants"
import withProductCreation from "../../containers/ProductCreation"
import withGeolocation from "../../containers/Geolocation"
import {compose} from "redux"
import withProducts, {ProductsProps} from "../../containers/Products"
import ProductCard from "../ProductCard"
import SubcategoriesNav from "./SubcategoriesNav"
import CategoriesNav from "./CategoriesNav"
import {withRouter} from "react-router-dom"
import {GeolocationProps} from "../../containers/GeolocationOnline"
import {RouterState} from "react-router-redux"
import ProductCreation from "./ProductCreation"

const findCategoryByUrl = (
  url: string | null,
  categories: Category[]
): Category =>
  categories.find(category => category.url === url) || categories[0]

interface MenuProps extends ProductsProps, GeolocationProps, RouterState {}

interface MenuState {
  currentCategory: Category
  currentSubcategory: Subcategory
}

export class Menu extends React.Component<MenuProps, MenuState> {
  static getDerivedStateFromProps(props: MenuProps, state: MenuState) {
    if (
      (props.location && props.location.pathname) !== state.currentCategory.url
    ) {
      props.getProducts(
        findCategoryByUrl(
          props.location && props.location.pathname,
          props.categories
        )
      )
      return {
        currentCategory: findCategoryByUrl(
          props.location && props.location.pathname,
          props.categories
        ),
        currentSubcategory: {id: 0, name: "Все"},
      }
    } else {
      return null
    }
  }

  state = {
    currentCategory: findCategoryByUrl(
      this.props.location && this.props.location.pathname,
      this.props.categories
    ),
    currentSubcategory: {id: 0, name: "Все"},
  }

  componentDidMount() {
    this.props.getProducts(this.state.currentCategory)
  }

  handleChangeSubcategory = (subcategory: Subcategory) =>
    this.setState({currentSubcategory: subcategory})

  Products = () => {
    switch (this.state.currentCategory.productsStatus) {
      case Status.LOADING:
        return <p>Loading...</p>
      case Status.LOADING_ERROR:
        return <p>Loading error.</p>
      case Status.LOADED:
        return (
          <Row>
            {this.state.currentCategory.products
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
    return (
      <>
        <CategoriesNav
          categories={this.props.categories}
          currentCategory={this.state.currentCategory}
        />

        <SubcategoriesNav
          handleChangeSubcategory={this.handleChangeSubcategory}
          subcategories={this.state.currentCategory.subcategories}
          currentSubcategory={this.state.currentSubcategory}
        />

        <this.Products />

        <ProductCreation />
      </>
    )
  }
}

export default withRouter(
  compose<any>(
    withProducts,
    withGeolocation,
    withProductCreation
  )(Menu)
)
