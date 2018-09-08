import React, {ComponentType, Component} from "react"
import _ from "lodash"
import {
  Product,
  Category,
  OptionConcat,
  Price,
} from "../../containers/Products/actions"
import {BASE_URL} from "../../constants"
import IndependentOptions from "../ProductCard/IndependentOptions"
import DependentOptions from "../ProductCard/DependentOptions"
import {PrimaryButton} from "../PrimaryButton"
import pizzaPlaceholder from "../../assets/pizza_placeholder.png"
import {compose} from "redux"
import {ThemeProps, styled, withTheme} from "../App/emotion"
import {Link} from "react-router-dom"

interface ProductViewOwnProps {
  product: Product
  category: Category
  quantityInCart: number
  currentProductState: {
    independentOptions: OptionConcat[]
    dependentOptions: OptionConcat[]
    price: Price
  }
  changeCurrentProduct(optionId: number, valueId: number, value: string): void
  handleAddProductToCart(): void
}

interface ProductViewProps extends ProductViewOwnProps, ThemeProps {}

class ProductView extends Component<ProductViewProps> {
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

  render() {
    return (
      <ProductView.Wrapper>
        <ProductView.Link
          to={`/${this.props.category.key}/${this.props.product.id}`}
        >
          <div className="my-2 font-weight-bold text-center">
            {this.props.product.name}
            {this.props.quantityInCart > 0 && (
              <span className={"badge badge-pill badge-success ml-2 bg-orange"}>
                {this.props.quantityInCart}
              </span>
            )}
          </div>

          <div className="align-self-center my-2">
            <img
              className="d-block w-100"
              src={
                this.props.product.imageUrl
                  ? `${BASE_URL}/${this.props.product.imageUrl}`
                  : pizzaPlaceholder
              }
            />
          </div>

          <ProductView.Ingridients className={"text-center my-2 flex-grow-1"}>
            <small className="font-weight-bold">
              {this.props.product.description}
            </small>
          </ProductView.Ingridients>
        </ProductView.Link>

        <IndependentOptions
          className="my-2"
          options={this.props.product.options}
          independentOptions={this.props.currentProductState.independentOptions}
          changeCurrentProduct={this.props.changeCurrentProduct}
        />

        <DependentOptions
          className={"mx-4 my-2 text-lightgreen"}
          options={this.props.product.options}
          dependentOptions={this.props.currentProductState.dependentOptions}
        />

        <PrimaryButton
          className="my-2"
          onClick={this.props.handleAddProductToCart}
        >
          {this.props.currentProductState.price.value}
          <small>{this.props.currentProductState.price.currency}</small>
          {" Заказать"}
        </PrimaryButton>
      </ProductView.Wrapper>
    )
  }
}
export default compose<ComponentType<ProductViewOwnProps>>(withTheme)(
  ProductView
)
