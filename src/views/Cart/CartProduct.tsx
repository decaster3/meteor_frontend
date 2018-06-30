import * as React from "react"
import {css, cx} from "emotion"
import Icon from "react-fa"

import {CartProduct} from "../../containers/Cart/actions"
import {ThemeProps, withTheme, styled} from "../App/Theme"

interface CartProductProps {
  product: CartProduct
  removeProductFromCart(product: CartProduct): void
  addProductToCart(product: CartProduct): void
}

const handleAddProduct = (props: CartProductProps) => () => {
  props.addProductToCart(props.product)
}

const handleRemoveProduct = (props: CartProductProps) => () => {
  props.removeProductFromCart(props.product)
}

const Button = styled("button")`
  line-height: 1;
  padding: 8px;
  width: 36px;
  height: 36px;
`

interface OptionProps {
  name: string
  value: string
}

const Option: React.SFC<OptionProps> = props => (
  <div
    className={cx(
      "mr-3",
      css`
        white-space: nowrap;
      `
    )}
  >
    <small className="mr-2">{props.name}</small>
    {props.value}
  </div>
)

const CartProduct: React.StatelessComponent<
  CartProductProps & ThemeProps
> = props => {
  const independentOptions: Array<[string, string]> = []
  const dependentOptions: Array<[string, string]> = []

  props.product.instance.independentOptions.forEach(independentOption => {
    props.product.options.forEach(option => {
      if (option.id === independentOption.optionId) {
        option.optionValues.forEach(optionValue => {
          if (optionValue.id === independentOption.valueId) {
            independentOptions.push([option.name, optionValue.value])
          }
        })
      }
    })
  })

  props.product.instance.dependentOptions.forEach(dependentOption => {
    props.product.options.forEach(option => {
      if (option.id === dependentOption.optionId) {
        option.optionValues.forEach(optionValue => {
          if (optionValue.id === dependentOption.valueId) {
            dependentOptions.push([option.name, optionValue.value])
          }
        })
      }
    })
  })

  return (
    <div className="row align-items-center mb-4 text-uppercase font-weight-bold">
      <div className="col-4 col-md-auto my-2 text-center">
        <img
          className={cx(
            css`
              max-width: 100%;
              max-height: 64px;
            `
          )}
          src={`https://picsum.photos/300/200/?blue&image=${props.product.id}`}
        />
      </div>

      <div className="col-8 col-md mb-2 mb-md-0">
        <div>{props.product.name}</div>
        <div
          className={css`
            display: flex;
            flex-flow: row wrap;
            color: ${props.theme.lightGreen};
          `}
        >
          {independentOptions.map(([name, value], index) => (
            <Option key={index} name={name} value={value} />
          ))}

          {dependentOptions.map(([name, value], index) => (
            <Option key={index} name={name} value={value} />
          ))}
        </div>
      </div>

      <div className="col-4 col-md-2 h4 mb-0 text-center">
        {props.product.price.value}&nbsp;<small>
          {props.product.price.currency}
        </small>
      </div>

      <div className="col-6 col-md-3">
        <div className="row no-gutters align-items-center text-center">
          <div className={"col"}>
            <Button
              className="btn btn-outline-danger"
              onClick={handleRemoveProduct(props)}
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
              <span className="h4 mb-0">{props.product.count}</span>
            </div>
          </div>

          <div className="col">
            <Button
              className="btn btn-outline-success"
              onClick={handleAddProduct(props)}
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

export default withTheme(CartProduct)
