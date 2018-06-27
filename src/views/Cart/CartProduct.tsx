import * as React from "react"
import {css, cx} from "emotion"

import {CartProduct, Option} from "../../containers/Cart/actions"
import {OptionConcat} from "../../containers/Product/actions"
import {ThemeProps, withTheme, styled} from "../App/Theme"
import Icon from "react-fa"
import {Col} from "reactstrap"

const Button = styled("button")`
  line-height: 1;
  width: 36px;
  height: 36px;
  margin: 8px;
`

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
    <div
      className={cx(
        "row align-items-center mb-3",
        css`
          text-transform: uppercase;
          font-weight: 500;
        `
      )}
    >
      <div className="col-12 col-sm-auto my-2 text-center">
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

      <div className="col-12 col-sm my-2">
        <div>{props.product.name}</div>
        {/* <div
          className={cx(
            "mt-3",
            css`
              font-size: 0.75em;
              font-weight: 700;
              color: ${props.theme.lighterGrey};
            `
          )}
        >
          {props.product.description}
        </div> */}
        <span
          className={css`
            color: ${props.theme.lightGreen};
          `}
        >
          {independentOptions.map(([name, value], index) => (
            <span
              key={index}
              className={cx(
                "mr-3",
                css`
                  white-space: nowrap;
                `
              )}
            >
              <small className="mr-2">{name}</small>
              {value}
            </span>
          ))}

          {dependentOptions.map(([name, value], index) => (
            <span
              key={index}
              className={cx(
                "mr-3",
                css`
                  white-space: nowrap;
                `
              )}
            >
              <small className="mr-2">{name}</small>
              {value}
            </span>
          ))}
        </span>
      </div>

      <div className="col-2 h4 mb-0 text-center">
        {props.product.price.value}&nbsp;<small>
          {props.product.price.currency}
        </small>
      </div>

      {/* <Col xs={1} className="text-center h5 mb-0">
        <Icon
          name="times"
          className={css`
            color: ${props.theme.lighterGrey};
          `}
        />
      </Col> */}

      {/* <Col xs={1} className="text-center h4 mb-0">
        {props.product.count}
      </Col> */}

      {/* <div className="col-1 text-center">{props.product.count}</div> */}

      <div className={"col-auto"}>
        <Button
          className="btn btn-outline-danger p-2"
          onClick={handleRemoveProduct(props)}
        >
          <Icon name="minus" />
        </Button>
      </div>

      <div className="col-1 text-center">
        <span className="h4 mb-0">{props.product.count}</span>
      </div>

      <div className="col-auto">
        <Button
          className="btn btn-outline-success p-2"
          onClick={handleAddProduct(props)}
        >
          <Icon name="plus" />
        </Button>
      </div>

      <div className="col-1 text-center">
        <span className="h5 mb-0 text-danger">
          <Icon name="times" />
        </span>
      </div>
    </div>
  )
}

export default withTheme(CartProduct)
