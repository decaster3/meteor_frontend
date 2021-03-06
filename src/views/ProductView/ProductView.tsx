import React, {Component} from "react"
import {Link} from "react-router-dom"
import pizzaPlaceholder from "../../assets/pizza_placeholder.png"
import {API_URL} from "../../constants"
import {
  Category,
  OptionConcat,
  Price,
  Product,
} from "../../containers/Products/actions"
import {styled} from "../App/emotion"
import {PrimaryButton} from "../PrimaryButton"
import DependentOptions from "../ProductCard/DependentOptions"
import IndependentOptions from "../ProductCard/IndependentOptions"

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

type ProductViewProps = ProductViewOwnProps

class ProductView extends Component<ProductViewProps> {
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
      <div className="flex-grow-1 row align-items-center">
        <div className="col-12 col-md-7 py-2">
          <img
            className="d-block w-100"
            src={
              this.props.product.imageUrl
                ? `${API_URL}/${this.props.product.imageUrl}`
                : pizzaPlaceholder
            }
          />
        </div>

        <div className="col d-flex flex-column py-2">
          <h3 className="my-2 font-weight-bold text-center">
            {this.props.product.name}
            {this.props.quantityInCart > 0 && (
              <span className={"badge badge-pill badge-success ml-2 bg-orange"}>
                {this.props.quantityInCart}
              </span>
            )}
          </h3>

          <div className={"text-center my-2 text-lightergrey fw-medium"}>
            {this.props.product.description}
          </div>

          <IndependentOptions
            className="my-2"
            options={this.props.product.options}
            independentOptions={
              this.props.currentProductState.independentOptions
            }
            changeCurrentProduct={this.props.changeCurrentProduct}
          />

          <DependentOptions
            className={"mx-4 my-2 text-lightgreen w-50 mx-auto"}
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
        </div>
      </div>
    )
  }
}
export default ProductView
