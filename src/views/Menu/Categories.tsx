import * as React from "react"
import {Row, Col} from "reactstrap"
import * as _ from "lodash"
import * as classnames from "classnames"
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

  renderCategories = () => {
    return (
      <Row className="align-items-center justify-content-around py-3">
        {this.props.categories.map(category => (
          <div
            key={category.id}
            className={classnames(styles.categoryLinkWrapper, {
              [styles.active]:
                this.state.currentCategory &&
                category.id === this.state.currentCategory.id,
            })}
          >
            <Link to={category.url}>
              <img src={category.imgUrl} />
              <span>{category.name}</span>
            </Link>
          </div>
        ))}
      </Row>
    )
  }

  renderSubcategories = () => {
    const currentCategory = this.props.categories.find(
      cat => cat.id === this.state.currentCategory.id
    )
    if (currentCategory) {
      const appendAllSubcategory = [
        ...currentCategory.subcategories,
        {id: 0, name: "Все"},
      ]
      return appendAllSubcategory.map(sub => (
        <div key={sub.id}>
          <button
            onClick={
              // tslint:disable-next-line:jsx-no-lambda
              () => this.setState({currentSubcategory: sub})
            }
          >
            {sub.name}
            {this.state.currentSubcategory.name === sub.name ? (
              <div>Выбрана</div>
            ) : (
              <div />
            )}
          </button>
        </div>
      ))
    }
    return <div>Loading</div>
  }

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
        {this.renderCategories()}
        {this.renderSubcategories()}
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