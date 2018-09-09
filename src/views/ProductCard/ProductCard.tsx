import React, {ComponentType, Component} from "react"
import _ from "lodash"
import {
  Product,
  ProductInstance,
  OptionConcat,
  Category,
} from "../../containers/Products/actions"
import withCart, {CartProps} from "../../containers/Cart"
import {cx, css} from "emotion"
import {API_URL} from "../../constants"
import IndependentOptions from "./IndependentOptions"
import DependentOptions from "./DependentOptions"
import {PrimaryButton} from "../PrimaryButton"
import pizzaPlaceholder from "../../assets/pizza_placeholder.png"
import {compose} from "redux"
import {ThemeProps, styled, withTheme} from "../App/emotion"
import {Link} from "react-router-dom"

interface ProductCardOwnProps {
  product: Product
  category: Category
}

interface ProductCardProps extends ProductCardOwnProps, CartProps, ThemeProps {}

interface ProductCardState {
  currentProductState: ProductInstance
  quantityInCart: number
}

class ProductCard extends Component<ProductCardProps, ProductCardState> {
  static Ingridients = styled("div")`
    color: ${props => props.theme.lighterGrey};
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

  static Link = styled(Link)`
    text-decoration: none;
    display: block;
    display: flex;
    flex: 1;
    flex-flow: column;
    color: inherit;
    :hover,
    :focus,
    :active {
      color: inherit;
      text-decoration: none;
    }
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
        <ProductCard.Link
          to={`/${this.props.category.key}/${this.props.product.id}`}
        >
          <div className="my-2 font-weight-bold text-center">
            {this.props.product.name}
            {this.state.quantityInCart > 0 && (
              <span className={"badge badge-pill badge-success ml-2 bg-orange"}>
                {this.state.quantityInCart}
              </span>
            )}
          </div>

          <div className="align-self-center my-2">
            <img
              className="d-block w-100"
              src={
                this.props.product.imageUrl
                  ? `${API_URL}/${this.props.product.imageUrl}`
                  : pizzaPlaceholder
              }
            />
          </div>

          <ProductCard.Ingridients className={"text-center my-2 flex-grow-1"}>
            <small className="font-weight-bold">
              {this.props.product.description}
            </small>
          </ProductCard.Ingridients>
        </ProductCard.Link>

        <IndependentOptions
          className="my-2"
          options={this.props.product.options}
          independentOptions={this.state.currentProductState.independentOptions}
          changeCurrentProduct={this.changeCurrentProduct}
        />

        <DependentOptions
          className={"mx-4 my-2 text-lightgreen"}
          options={this.props.product.options}
          dependentOptions={this.state.currentProductState.dependentOptions}
        />

        <PrimaryButton className="my-2" onClick={this.handleAddProductToCart}>
          {this.state.currentProductState.price.value}
          <small>{this.state.currentProductState.price.currency}</small>
          {" Заказать"}
        </PrimaryButton>
      </ProductCard.Wrapper>
    )
  }
}
export default compose<ComponentType<ProductCardOwnProps>>(
  withCart,
  withTheme
)(ProductCard)
