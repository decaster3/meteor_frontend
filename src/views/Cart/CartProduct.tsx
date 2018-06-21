import * as React from "react"
import {css, cx} from "emotion"

import {CartProduct, Option} from "../../containers/Cart/actions"
import {OptionConcat} from "../../containers/Product/actions"
import {ThemeProps, withTheme} from "../App/Theme"

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
        "row align-items-center my-3",
        css`
          text-transform: uppercase;
          font-weight: 500;
        `
      )}
    >
      <div className="col">
        <img
          className={cx(
            "m-2",
            css`
              max-width: 100%;
            `
          )}
          src={`https://picsum.photos/300/200/?blue&image=${props.product.id}`}
        />
      </div>
      <div className="col">
        <div className="text-center">{props.product.name}</div>
        <div
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
        </div>
      </div>
      <div
        className={cx(
          "col",
          css`
            color: ${props.theme.lightGreen};
          `
        )}
      >
        <div>
          {independentOptions.map(([name, value], index) => (
            <div
              className="d-flex justify-content-between align-items-center"
              key={index}
            >
              <div>
                <small>{name}</small>
              </div>
              <div>{value}</div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          {dependentOptions.map(([name, value], index) => (
            <div
              className="d-flex justify-content-between  align-items-center"
              key={index}
            >
              <div>
                <small>{name}</small>
              </div>
              <div>{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-1 text-center">{props.product.count}</div>
      <div className="col-1">
        <button
          className="btn btn-block btn-outline-success"
          onClick={handleAddProduct(props)}
        >
          +
        </button>
        <button
          className="btn btn-block btn-outline-danger"
          onClick={handleRemoveProduct(props)}
        >
          -
        </button>
      </div>
    </div>
  )
}

export default withTheme(CartProduct)
