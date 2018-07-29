import React, {ComponentType, Component} from "react"
import _ from "lodash"
import {
  Product,
  ProductInstance,
  OptionConcat,
} from "../../containers/Products/actions"
import withCart, {CartProps} from "../../containers/Cart"
import {cx, css} from "emotion"
import {BASEURL} from "../../constants"
import IndependentOptions from "./IndependentOptions"
import DependentOptions from "./DependentOptions"
import {PrimaryButton} from "../PrimaryButton"
import pizzaPlaceholder from "../../assets/pizza_placeholder.png"
import {compose} from "redux"
import {ThemeProps, styled, withTheme} from "../App/emotion"

interface ProductCardOwnProps {
  product: Product
}

interface ProductCardProps extends ProductCardOwnProps, CartProps, ThemeProps {}

interface ProductCardState {
  currentProductState: ProductInstance
  quantityInCart: number
}

class ProductCard extends Component<ProductCardProps, ProductCardState> {
  static Ingridients = styled("div")`
    font-size: 0.75rem;
    color: ${props => props.theme.lighterGrey};
    font-weight: 700;
    flex: 1;
  `

  static Name = styled("div")`
    font-weight: 700;
    letter-spacing: 0.125em;
    text-align: center;
  `

  static Wrapper = styled("div")`
    color: white;
    text-transform: uppercase;
    font-weight: 500;
    max-width: 20rem;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
    height: 100%;
  `

  state: ProductCardState = {
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
      <ProductCard.Wrapper>
        <ProductCard.Name className="my-2">
          {this.props.product.name}
          {this.state.quantityInCart > 0 && (
            <span
              className={cx(
                "badge badge-pill badge-success ml-2",
                css`
                  background: ${this.props.theme.orange};
                `
              )}
            >
              {this.state.quantityInCart}
            </span>
          )}
        </ProductCard.Name>

        <div className="align-self-center my-2">
          <img
            className="d-block w-100"
            src={
              this.props.product.imageUrl
                ? `${BASEURL}/${this.props.product.imageUrl}`
                : pizzaPlaceholder
            }
          />
        </div>

        <ProductCard.Ingridients className={"text-center my-2"}>
          {this.props.product.description}
        </ProductCard.Ingridients>

        <IndependentOptions
          className="my-2"
          options={this.props.product.options}
          independentOptions={this.state.currentProductState.independentOptions}
          changeCurrentProduct={this.changeCurrentProduct}
        />

        <DependentOptions
          className={cx(
            "mx-4 my-2",
            css`
              color: ${this.props.theme.lightGreen};
            `
          )}
          options={this.props.product.options}
          dependentOptions={this.state.currentProductState.dependentOptions}
        />

        <PrimaryButton className="my-2" onClick={this.handleAddProductToCart}>
          {this.state.currentProductState.price.value}
          <small>{this.state.currentProductState.price.currency}</small> Order
        </PrimaryButton>
      </ProductCard.Wrapper>
    )
  }
}
export default compose<ComponentType<ProductCardOwnProps>>(
  withCart,
  withTheme
)(ProductCard)
