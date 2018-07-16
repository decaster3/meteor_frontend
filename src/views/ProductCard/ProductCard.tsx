import React from "react"
import _ from "lodash"
import {
  Product,
  ProductInstance,
  OptionConcat,
} from "../../containers/Products/actions"
import styles from "./ProductCard.module.scss"
import {CartProduct} from "../../containers/Cart/actions"
import withCart from "../../containers/Cart"
import {cx} from "emotion"
import {BASEURL} from "../../constants"
import IndependentOptions from "./IndependentOptions"
import DependentOptions from "./DependentOptions"
import {PrimaryButton} from "../PrimaryButton"
import pizzaPlaceholder from "../../assets/pizza_placeholder.png"
import {compose} from "redux"

interface ProductCardProps {
  product: Product
  products: CartProduct[]
  addProductToCart(product: CartProduct): void
}
interface ProductCardState {
  currentProductState: ProductInstance
  quantityInCart: number
}

class ProductCard extends React.Component<ProductCardProps, ProductCardState> {
  state: ProductCardState = {
    currentProductState: _.cloneDeep(this.props.product.instances[0]),
    quantityInCart: 0,
  }
  componentDidMount() {
    const foundedProductInCart = this.props.products.find(
      (product: CartProduct) => product.id === this.props.product.id
    )
    this.setState({
      quantityInCart:
        foundedProductInCart && foundedProductInCart.count
          ? foundedProductInCart.count
          : 0,
    })
  }

  changeCurrentProduct = (optionId: number, valueId: number, value: string) => {
    const newState = _.cloneDeep(this.state.currentProductState)
    const valueForChangeId = newState.independentOptions.findIndex(
      io => optionId === io.optionId
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
      <div className={styles.productCard}>
        <div className={cx(styles.name, "text-center")}>
          {this.props.product.name}{" "}
        </div>
        <div className={cx(styles.badge, "mt-1 mr-1")}>
          {this.state.quantityInCart}
        </div>

        <div className={styles.imageContainer}>
          <img
            src={
              this.props.product.imageUrl
                ? `${BASEURL}/${this.props.product.imageUrl}`
                : pizzaPlaceholder
            }
          />
        </div>

        <div className={cx(styles.ingridients, "text-center")}>
          {this.props.product.description}
        </div>

        <IndependentOptions
          options={this.props.product.options}
          independentOptions={this.state.currentProductState.independentOptions}
          changeCurrentProduct={this.changeCurrentProduct}
        />

        <DependentOptions
          options={this.props.product.options}
          dependentOptions={this.state.currentProductState.dependentOptions}
        />

        <PrimaryButton onClick={this.handleAddProductToCart}>
          {this.state.currentProductState.price.value}
          <small>{this.state.currentProductState.price.currency}</small> Order
        </PrimaryButton>
      </div>
    )
  }
}
export default compose<any>(withCart)(ProductCard)
