import React from "react"
import {Row, Col} from "reactstrap"
import _ from "lodash"
import classnames from "classnames"
import {Category, Product, Subcategory} from "../../containers/Product/actions"
import {Status, categoriesData} from "../../constants"
import {CartProduct} from "../../containers/Cart/actions"
import ModalWrapper from "../ModalWrapper"
import withProductCreation from "../../containers/ProductCreation"
import withGeolocation from "../../containers/Geolocation"
import ProductCreationForm from "./ProductCreationForm"
import * as styles from "./Menu.module.scss"
import {compose} from "redux"
import withProductsAndCategories from "../../containers/Product"
import {City} from "../../containers/Geolocation/actions"
import {Link, withRouter} from "react-router-dom"
import ProductCard from "../ProductCard"
import SubcategoriesNav from "./SubcategoriesNav"
import CategoriesNav from "./CategoriesNav"

interface CategoriesProps {
  categories: Category[]
  isProductCreating: boolean
  defaultCity: City
  location: any
  addProductToCart(product: CartProduct): void
  getProducts(category: Category): void
  createProduct(image: any, product: any): void
}

interface CategoriesState {
  currentCategory: Category
  currentSubcategory: Subcategory
}

export class Categories extends React.Component<
  CategoriesProps,
  CategoriesState
> {
  constructor(props: CategoriesProps) {
    super(props)
    this.state = {
      currentCategory: this.findCategoryByUrl(this.props.location.pathname),
      currentSubcategory: {id: 0, name: "Все"},
    }
  }

  componentDidMount() {
    this.props.getProducts(this.state.currentCategory)
  }

  shouldComponentUpdate(nextProps: CategoriesProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({
        currentCategory: this.findCategoryByUrl(nextProps.location.pathname),
        currentSubcategory: {id: 0, name: "Все"},
      })
      this.props.getProducts(
        this.findCategoryByUrl(nextProps.location.pathname)
      )
      return false
    }
    return true
  }

  findCategoryByUrl = (url: string) => {
    return (
      this.props.categories.find(category => category.url === url) ||
      categoriesData[0]
    )
  }

  handleChangeSubcategory = (subcategory: Subcategory) =>
    this.setState({currentSubcategory: subcategory})

  renderProducts = () => {
    const currentCategory = this.props.categories.find(
      cat => cat.id === this.state.currentCategory.id
    )
    if (currentCategory) {
      switch (currentCategory.productsStatus) {
        case Status.LOADING:
          return <p>Loading...</p>
        case Status.LOADING_ERROR:
          return <p>Loading error.</p>
        case Status.LOADED:
          if (this.state.currentSubcategory.name === "Все") {
            return (
              <Row>
                {currentCategory.products.map((product: Product) => (
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
          } else {
            return (
              <Row>
                {currentCategory.products
                  .filter(product =>
                    _.includes(
                      product.subcategories,
                      this.state.currentSubcategory
                    )
                  )
                  .map((product: Product) => (
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
          }
        default:
          return <p>Something went wrong. Reload the page.</p>
      }
    }
    return <div>Category is not selected.</div>
  }

  handleSubmit = (values: any) => {
    const productInstancesAttributes: any[] = []
    const citiesAttributes = [{cityId: this.props.defaultCity.id}]
    values.get("options").forEach((optionValuesElement: any) => {
      const optionValuesAttributes: any[] = []
      if (this.state.currentCategory) {
        this.state.currentCategory.optionNames.forEach(optionName => {
          const currentOpt = {
            optionNameId: optionName.id,
            value: optionValuesElement.get(optionName.name),
          }
          optionValuesAttributes.push(currentOpt)
        })
      }
      const productInstance = {
        pricesAttributes: [
          {
            cityId: this.props.defaultCity.id,
            value: optionValuesElement.get("price"),
          },
        ],
        optionValuesAttributes,
      }
      productInstancesAttributes.push(productInstance)
    })
    const product = {
      name: values.get("name"),
      description: values.get("description"),
      isTopping: false,
      categoryId: this.state.currentCategory && this.state.currentCategory.id,
      productInstancesAttributes,
    }
    this.props.createProduct(values.get("image"), {
      product,
      citiesAttributes,
      subcategoriesAttributes: [],
    })
  }

  renderProductCreation = () => {
    const modalToggeler = () => <button>Создать новый продукт</button>
    return (
      <ModalWrapper
        modalTitle={"Создание продукта"}
        modalToggler={modalToggeler}
        onCloseListener={this.props.isProductCreating}
      >
        <ProductCreationForm
          productCreationStatus={this.props.isProductCreating}
          onSubmit={this.handleSubmit}
          optionNames={
            this.state.currentCategory
              ? this.state.currentCategory.optionNames
              : []
          }
        />
      </ModalWrapper>
    )
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
          category={this.state.currentCategory}
          currentSubcategory={this.state.currentSubcategory}
        />

        {this.renderProducts()}
        {this.renderProductCreation()}
      </>
    )
  }
}

export default withRouter(
  compose<any>(
    withProductsAndCategories,
    withGeolocation,
    withProductCreation
  )(Categories)
)
