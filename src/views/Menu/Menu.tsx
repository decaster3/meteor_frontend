import React from "react"
import {Row, Col} from "reactstrap"
import _ from "lodash"
import {Category, Subcategory} from "../../containers/Products/actions"
import {Status, categoriesData} from "../../constants"
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
import withCategories, {CategoriesProps} from "../../containers/Category"

const findCategoryByUrl = (url: string | null, categories: Category[]) =>
  categories.find(category => category.url === url) || categoriesData[0]

interface MenuProps extends ProductsProps, GeolocationProps, RouterState {}

interface MenuState {
  currentCategory: Category
  currentSubcategory: Subcategory
}

export class Menu extends React.Component<MenuProps, MenuState> {
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

  shouldComponentUpdate(nextProps: MenuProps) {
    if (
      (this.props.location && this.props.location.pathname) !==
      (nextProps.location && nextProps.location.pathname)
    ) {
      this.setState({
        currentCategory: findCategoryByUrl(
          nextProps.location && nextProps.location.pathname,
          nextProps.categories
        ),
        currentSubcategory: {id: 0, name: "Все"},
      })
      this.props.getProducts(
        findCategoryByUrl(
          nextProps.location && nextProps.location.pathname,
          nextProps.categories
        )
      )
      return false
    }
    return true
  }

  handleChangeSubcategory = (subcategory: Subcategory) =>
    this.setState({currentSubcategory: subcategory})

  renderProducts = () => {
    const currentCategory = this.props.categories.find(
      x => x.id === this.state.currentCategory.id
    )
    if (currentCategory) {
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
    return <div>Category is not selected.</div>
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

        {this.renderProducts()}

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
