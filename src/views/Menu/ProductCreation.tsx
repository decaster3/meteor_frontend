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
import {withRouter, RouteComponentProps} from "react-router-dom"
import CustomModal from "../CustomModal"
import withCategories, {CategoriesProps} from "../../containers/Category"

const findCategoryByKey = (categories: Category[], key?: string | null) => {
  return categories.find(category => category.key === key) || categoriesData[0]
}

interface ProductCreationViewProps
  extends ProductCreationProps,
    ProductsProps,
    RouteComponentProps<{category?: string}>,
    GeolocationProps,
    CategoriesProps {}

interface ProductCreationViewState {
  modalShown: boolean
}

export class Categories extends React.Component<
  ProductCreationViewProps,
  ProductCreationViewState
> {
  state: ProductCreationViewState = {
    modalShown: false,
  }

  componentDidMount() {
    this.props.getProducts(
      findCategoryByKey(this.props.categories, this.props.match.params.category)
    )
  }

  handleSubmit = (values: any) => {
    const currentCategory = findCategoryByKey(
      this.props.categories,
      this.props.match.params.category
    )
    const productInstancesAttributes: any[] = []
    const citiesAttributes = [{cityId: this.props.defaultCity.id}]
    const subcategoriesAttributes: any[] = []
    if (currentCategory) {
      currentCategory.subcategories.forEach((subcat: Subcategory) => {
        if (values.get(`subcategory${subcat.id}`)) {
          subcategoriesAttributes.push({subcategoryId: subcat.id})
        }
      })
    }
    values.get("options").forEach((optionValuesElement: any) => {
      const optionValuesAttributes: any[] = []
      if (currentCategory) {
        currentCategory.optionNames.forEach(optionName => {
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
      categoryId: currentCategory.id,
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
    const currentCategory = findCategoryByKey(
      this.props.categories,
      this.props.match.params.category
    )
    return (
      <>
        <button onClick={this.toggle}>Создать новый продукт</button>

        <CustomModal
          centered
          isOpen={this.state.modalShown || this.props.isProductCreating}
          toggle={this.toggle}
        >
          <h3 className="text-center">Создание продукта</h3>
          <ProductCreationForm
            productCreationStatus={this.props.isProductCreating}
            onSubmit={this.handleSubmit}
            optionNames={currentCategory.optionNames}
            subcategories={currentCategory.subcategories}
          />
        </CustomModal>
      </>
    )
  }
}

export default compose(
  withRouter,
  withCategories,
  withProducts,
  withProductCreation,
  withGeolocation
)(Categories)
