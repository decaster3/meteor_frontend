import React from "react"
import {css, cx} from "emotion"
import Icon from "react-fa"

import {CartProduct} from "../../containers/Cart/actions"
import {ThemeProps, withTheme, styled} from "../App/Theme"

const Button = styled("button")`
  line-height: 1;
  padding: 8px;
  width: 36px;
  height: 36px;
`

// interface OptionProps {
//   value: string
// }

// const Option: React.SFC<OptionProps> = props => (
//   <div
//     className={cx(
//       "mr-3",
//       css`
//         white-space: nowrap;
//       `
//     )}
//   >
//     {props.value}
//   </div>
// )

interface CartProductProps {
  product: CartProduct
  removeProductFromCart(product: CartProduct): void
  addProductToCart(product: CartProduct): void
}

interface CartProductState {
  independentOptions: string[]
  dependentOptions: string[]
}

class CartProductView extends React.Component<
  CartProductProps & ThemeProps,
  CartProductState
> {
  constructor(props: CartProductProps & ThemeProps) {
    super(props)

    this.state = {
      independentOptions: [],
      dependentOptions: [],
    }

    props.product.instance.independentOptions.forEach(independentOption => {
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

    props.product.instance.dependentOptions.forEach(dependentOption => {
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

  handleRemoveProduct = () => {
    this.props.removeProductFromCart(this.props.product)
  }

  handleAddProduct = () => {
    this.props.addProductToCart(this.props.product)
  }

  render() {
    return (
      <div className="row align-items-center my-4 text-uppercase font-weight-bold">
        <div className="col-4 col-md-auto my-2 text-center">
          <img
            className={cx(
              css`
                max-width: 100%;
                max-height: 96px;
              `
            )}
            src={`https://picsum.photos/256/256/?blue&image=${
              this.props.product.id
            }`}
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
          {this.props.product.price.value}&nbsp;<small>
            {this.props.product.price.currency}
          </small>
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
            <Icon name="times" />
          </span>
        </div>
      </div>
    )
  }
}

export default withTheme(CartProductView)
