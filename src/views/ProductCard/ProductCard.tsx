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
import {cx, css} from "emotion"
import {BASEURL} from "../../constants"
import IndependentOptions from "./IndependentOptions"
import DependentOptions from "./DependentOptions"
import {PrimaryButton} from "../PrimaryButton"
import pizzaPlaceholder from "../../assets/pizza_placeholder.png"
import {compose} from "redux"
import {ThemeProps} from "../App/Theme"
import {withTheme} from "../../../node_modules/emotion-theming"

interface ProductCardProps extends ThemeProps {
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
    const founProductInCart = this.props.products.find(
      (product: CartProduct) => product.id === this.props.product.id
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
        <div className={styles.name}>
          {this.props.product.name}
          {this.state.quantityInCart > 0 && (
            <>
              {" "}
              <span
                className={cx(
                  "badge badge-pill badge-success",
                  css`
                    background: ${this.props.theme.orange};
                    display: inline-block;
                  `
                )}
              >
                {this.state.quantityInCart}
              </span>
            </>
          )}
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
export default compose<any>(
  withCart,
  withTheme
)(ProductCard)
