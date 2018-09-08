import React, {ComponentType, Component} from "react"
import _ from "lodash"
import {
  Product,
  ProductInstance,
  OptionConcat,
  Category,
} from "../../containers/Products/actions"
import withCart, {CartProps} from "../../containers/Cart"
import {compose} from "redux"
import ProductView from "./ProductView"

interface ProductViewWrapperOwnProps {
  product: Product
  category: Category
}

interface ProductViewWrapperProps
  extends ProductViewWrapperOwnProps,
    CartProps {}

interface ProductViewWrapperState {
  currentProductState: ProductInstance
  quantityInCart: number
}

class ProductViewWrapper extends Component<
  ProductViewWrapperProps,
  ProductViewWrapperState
> {
  state: ProductViewWrapperState = {
    currentProductState: _.cloneDeep(this.props.product.instances[0]),
    quantityInCart: 0,
  }

  componentDidMount() {
    const founProductInCart = this.props.products.find(
      product => product.id === this.props.product.id
    )
    this.setState({
      quantityInCart:
        founProductInCart && founProductInCart.count
          ? founProductInCart.count
          : 0,
    })
  }

  changeCurrentProduct = (optionId: number, valueId: number, value: string) => {
    const newState = _.cloneDeep(this.state.currentProductState)
    const valueForChangeId = newState.independentOptions.findIndex(
      x => optionId === x.optionId
    )
    const optionConcat: OptionConcat = {optionId, valueId, value}
    newState.independentOptions[valueForChangeId] = optionConcat
    const newProductInstance =
      this.props.product.instances.find(instance =>
        _(instance.independentOptions)
          .differenceWith(newState.independentOptions, _.isEqual)
          .isEmpty()
      ) || this.state.currentProductState
    this.setState({currentProductState: newProductInstance})
  }

  handleAddProductToCart = () => {
    this.props.addProductToCart({
      id: this.props.product.id,
      name: this.props.product.name,
      description: this.props.product.description,
      options: this.props.product.options,
      instances: [this.state.currentProductState],
      count: 1,
    })
    this.setState(prevState => ({quantityInCart: prevState.quantityInCart + 1}))
  }

  render() {
    return (
      <ProductView
        product={this.props.product}
        category={this.props.category}
        quantityInCart={this.state.quantityInCart}
        currentProductState={this.state.currentProductState}
        changeCurrentProduct={this.changeCurrentProduct}
        handleAddProductToCart={this.handleAddProductToCart}
      />
    )
  }
}
export default compose<ComponentType<ProductViewWrapperOwnProps>>(withCart)(
  ProductViewWrapper
)
