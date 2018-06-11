import * as React from "react"
import {CartProduct, Option} from "../../containers/Cart/actions"
import {OptionConcat} from "../../containers/Product/actions"

interface CartProductProps {
  product: CartProduct
  removeProductFromCart(product: CartProduct): void
  addProductToCart(product: CartProduct): void
}

const CartProduct: React.StatelessComponent<CartProductProps> = props => {
  const getOptions = (product: CartProduct) => {
    let independentOptions = ""
    let dependentOptions = ""

    product.instance.independentOptions.forEach(
      (independentOption: OptionConcat) => {
        product.options.forEach((option: Option) => {
          if (option.id === independentOption.optionId) {
            option.optionValues.forEach(
              (optionValue: {value: string; id: number}) => {
                if (optionValue.id === independentOption.valueId) {
                  independentOptions += `${option.name} ${optionValue.value}`
                }
              }
            )
          }
        })
      }
    )

    product.instance.dependentOptions.forEach(
      (dependentOption: OptionConcat) => {
        product.options.forEach((option: Option) => {
          if (option.id === dependentOption.optionId) {
            option.optionValues.forEach(
              (optionValue: {value: string; id: number}) => {
                if (optionValue.id === dependentOption.valueId) {
                  dependentOptions = `${dependentOptions} ${option.name} ${
                    optionValue.value
                  }`
                }
              }
            )
          }
        })
      }
    )
    return `${independentOptions} ${dependentOptions}`
  }
  const handleAddProductClick = () => {
    props.addProductToCart(props.product)
  }
  const handleRemoveProductClick = () => {
    props.removeProductFromCart(props.product)
  }
  return (
    <div>
      <div>{props.product.name}</div>
      <div>{props.product.description}</div>
      <div>{props.product.count}</div>
      <div>{getOptions(props.product)}</div>
      <button onClick={handleRemoveProductClick}>-</button>
      <button onClick={handleAddProductClick}>+</button>
    </div>
  )
}

export default CartProduct
