import * as React from "react"
import {css, cx} from "emotion"
import Icon from "react-fa"

import {CartProduct} from "../../containers/Cart/actions"
import {ThemeProps, withTheme, styled} from "../App/emotion"
import pizzaPlaceholder from "../../assets/pizza_placeholder.png"

interface OrderHistoryProductProps {
  product: CartProduct
  addProductToCart(product: CartProduct): void
}

interface OrderHistoryProductState {
  independentOptions: string[]
  dependentOptions: string[]
}

class OrderHistoryProduct extends React.Component<
  OrderHistoryProductProps & ThemeProps,
  OrderHistoryProductState
> {
  static AddToCartButton = styled("button")`
    line-height: 1;
    padding: 8px;
    height: 36px;
  `

  static Option = styled("div")`
    margin-right: 16px; /* mr-3 */
    white-space: nowrap;
  `

  constructor(props: OrderHistoryProductProps & ThemeProps) {
    super(props)

    this.state = {
      independentOptions: [],
      dependentOptions: [],
    }

    props.product.instances[0].independentOptions.forEach(independentOption => {
      props.product.options.forEach(option => {
        if (option.id === independentOption.optionId) {
          option.optionValues.forEach(optionValue => {
            if (optionValue.id === independentOption.valueId) {
              this.state.independentOptions.push(optionValue.value)
            }
          })
        }
      })
    })

    this.state.independentOptions.sort()

    props.product.instances[0].dependentOptions.forEach(dependentOption => {
      props.product.options.forEach(option => {
        if (option.id === dependentOption.optionId) {
          option.optionValues.forEach(optionValue => {
            if (optionValue.id === dependentOption.valueId) {
              this.state.dependentOptions.push(optionValue.value)
            }
          })
        }
      })
    })

    this.state.dependentOptions.sort()
  }

  handleAddProduct = () => {
    this.props.addProductToCart(this.props.product)
  }

  render() {
    return (
      <div className="row align-items-center mb-4 text-uppercase font-weight-bold">
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
              color: ${this.props.theme.lightGreen};
            `}
          >
            {this.state.independentOptions.map((value, index) => (
              <OrderHistoryProduct.Option key={index}>
                {value}
              </OrderHistoryProduct.Option>
            ))}

            {this.state.dependentOptions.map((value, index) => (
              <OrderHistoryProduct.Option key={index}>
                {value}
              </OrderHistoryProduct.Option>
            ))}
          </div>
        </div>

        <div className="col-4 col-md-2 h4 mb-0 text-center">
          {this.props.product.instances[0].price.value}&nbsp;<small>
            {this.props.product.instances[0].price.currency}
          </small>
        </div>

        <div className="col-1">
          <span className="h4 mb-0">{this.props.product.count}</span>
        </div>

        <div className="col-6 col-md-3">
          <OrderHistoryProduct.AddToCartButton
            className="btn btn-outline-success"
            onClick={this.handleAddProduct}
          >
            Добавить в карзину
          </OrderHistoryProduct.AddToCartButton>
        </div>
      </div>
    )
  }
}

export default withTheme(OrderHistoryProduct)
