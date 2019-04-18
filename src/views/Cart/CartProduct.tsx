import {css} from "emotion"
import React from "react"
import Icon from "react-fa"
import pizzaPlaceholder from "../../assets/pizza_placeholder.png"
import {CartProduct} from "../../containers/Cart/actions"
import {styled, theme} from "../App/emotion"

const Button = styled("button")`
  line-height: 1;
  padding: 8px;
  width: 36px;
  height: 36px;
`

interface CartProductProps {
  product: CartProduct
  removeProductFromCart(product: CartProduct): void
  deleteProduct(product: CartProduct): void
  addProductToCart(product: CartProduct): void
}

interface CartProductState {
  independentOptions: string[]
  dependentOptions: string[]
}

class CartProductView extends React.Component<
  CartProductProps,
  CartProductState
> {
  constructor(props: CartProductProps) {
    super(props)

    this.state = {
      independentOptions: [],
      dependentOptions: [],
    }

    props.product.instances[0].independentOptions.forEach(independentOption =>
      props.product.options
        .filter(option => option.id === independentOption.optionId)
        .forEach(option =>
          option.optionValues
            .filter(optionValue => optionValue.id === independentOption.valueId)
            .forEach(optionValue =>
              this.state.independentOptions.push(optionValue.value)
            )
        )
    )

    this.state.independentOptions.sort()

    props.product.instances[0].dependentOptions.forEach(dependentOption =>
      props.product.options
        .filter(option => option.id === dependentOption.optionId)
        .forEach(option =>
          option.optionValues
            .filter(optionValue => optionValue.id === dependentOption.valueId)
            .forEach(optionValue =>
              this.state.dependentOptions.push(optionValue.value)
            )
        )
    )

    this.state.dependentOptions.sort()
  }

  handleRemoveProduct = () => {
    this.props.removeProductFromCart(this.props.product)
  }
  handleDeleteProduct = () => {
    this.props.deleteProduct(this.props.product)
  }

  handleAddProduct = () => {
    this.props.addProductToCart(this.props.product)
  }

  render() {
    return (
      <div className="row align-items-center my-4 text-uppercase font-weight-bold">
        <div className="col-4 col-md-auto my-2 text-center">
          <img
            className={css`
              max-width: 100%;
              max-height: 96px;
            `}
            src={pizzaPlaceholder}
          />
        </div>

        <div className="col-8 col-md mb-2 mb-md-0">
          <div>{this.props.product.name}</div>
          <div
            className={css`
              display: flex;
              flex-flow: row wrap;
              color: ${theme.lightGreen};
            `}
          >
            {this.state.independentOptions.map((value, index) => (
              <div
                key={index}
                className={css`
                  white-space: nowrap;
                  margin-right: 1em;
                `}
              >
                {value}
              </div>
            ))}

            {this.state.dependentOptions.map((value, index) => (
              <div
                key={index}
                className={css`
                  white-space: nowrap;
                  margin-right: 1em;
                `}
              >
                {value}
              </div>
            ))}
          </div>
        </div>

        <div className="col-4 col-md-2 h4 mb-0 text-center">
          {this.props.product.instances[0].price.value}
          &nbsp;
          <small>{this.props.product.instances[0].price.currency}</small>
        </div>

        <div className="col-6 col-md-3">
          <div className="row no-gutters align-items-center text-center">
            <div className={"col"}>
              <Button
                className="btn btn-outline-danger"
                onClick={this.handleRemoveProduct}
              >
                <Icon name="minus" />
              </Button>
            </div>

            <div className="col">
              <div
                className={css`
                  min-width: 2em;
                `}
              >
                <span className="h4 mb-0">{this.props.product.count}</span>
              </div>
            </div>

            <div className="col">
              <Button
                className="btn btn-outline-success"
                onClick={this.handleAddProduct}
              >
                <Icon name="plus" />
              </Button>
            </div>
          </div>
        </div>

        <div className="col-2 col-md-1 text-center">
          <span className="h5 mb-0 text-danger">
            <Icon onClick={this.handleDeleteProduct} name="times" />
          </span>
        </div>
      </div>
    )
  }
}

export default CartProductView
