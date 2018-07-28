import React from "react"
import {Category, Subcategory} from "../../containers/Products/actions"
import {categoriesData} from "../../constants"
import ModalWrapper from "../ModalWrapper"
import withProductCreation, {
  ProductCreationProps,
} from "../../containers/ProductCreation"
import withGeolocation, {GeolocationProps} from "../../containers/Geolocation"
import ProductCreationForm from "./ProductCreationForm"
import {compose} from "redux"
import withProducts, {ProductsProps} from "../../containers/Products"
import {withRouter} from "react-router-dom"
import {RouterState} from "react-router-redux"
import CustomModal from "../CustomModal"
import withCategories, {CategoriesProps} from "../../containers/Category"

const findCategoryByUrl = (url: string | null, categories: Category[]) => {
  return categories.find(category => category.url === url) || categoriesData[0]
}

interface ProductCreationViewProps
  extends ProductCreationProps,
    ProductsProps,
    RouterState,
    GeolocationProps,
    CategoriesProps {}

interface ProductCreationViewState {
  modalShown: boolean
  currentCategory: Category
}

export class Categories extends React.Component<
  ProductCreationViewProps,
  ProductCreationViewState
> {
  state: ProductCreationViewState = {
    currentCategory: findCategoryByUrl(
      this.props.location && this.props.location.pathname,
      this.props.categories
    ),
    modalShown: false,
  }

  componentDidMount() {
    this.props.getProducts(this.state.currentCategory)
  }

  shouldComponentUpdate(nextProps: ProductCreationViewProps) {
    if (
      (this.props.location && this.props.location.pathname) !==
      (nextProps.location && nextProps.location.pathname)
    ) {
      this.setState({
        currentCategory: findCategoryByUrl(
          nextProps.location && nextProps.location.pathname,
          nextProps.categories
        ),
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

  handleSubmit = (values: any) => {
    const productInstancesAttributes: any[] = []
    const citiesAttributes = [{cityId: this.props.defaultCity.id}]
    const subcategoriesAttributes: any[] = []
    if (this.state.currentCategory) {
      this.state.currentCategory.subcategories.forEach(
        (subcat: Subcategory) => {
          if (values.get(`subcategory${subcat.id}`)) {
            subcategoriesAttributes.push({subcategoryId: subcat.id})
          }
        }
      )
    }
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
      subcategoriesAttributes,
    })
  }

  toggle = () =>
    this.setState(prevState => ({modalShown: !prevState.modalShown}))

  render() {
    return (
      <>
        <button onClick={this.toggle}>Создать новый продукт</button>

        <CustomModal
          isOpen={this.state.modalShown || this.props.isProductCreating}
        >
          <h3 className="text-center">Создание продукта</h3>
          <ProductCreationForm
            productCreationStatus={this.props.isProductCreating}
            onSubmit={this.handleSubmit}
            optionNames={
              this.state.currentCategory
                ? this.state.currentCategory.optionNames
                : []
            }
            subcategories={this.state.currentCategory.subcategories}
          />
        </CustomModal>
      </>
    )
  }
}

export default withRouter(
  compose<any>(
    withCategories,
    withProducts,
    withProductCreation,
    withGeolocation
  )(Categories)
)
