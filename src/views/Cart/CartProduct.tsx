import * as React from "react"
import {CartProduct, Option} from "../../containers/Cart/actions"
import {OptionConcat} from "../../containers/Product/actions"

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

const CartProduct: React.StatelessComponent<CartProductProps> = props => {
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
    <div>
      <div>{props.product.name}</div>
      <div>{props.product.description}</div>
      <div>{props.product.count}</div>
      <div>
        <ul>
          {independentOptions.map(([name, value], index) => (
            <li key={index}>
              {name} {value}
            </li>
          ))}
        </ul>
        <ul>
          {dependentOptions.map(([name, value], index) => (
            <li key={index}>
              {name} {value}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleRemoveProduct(props)}>-</button>
      <button onClick={handleAddProduct(props)}>+</button>
    </div>
  )
}

export default CartProduct
