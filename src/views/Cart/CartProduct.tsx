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
    let belongingOptions = ""
    let notBelongingOptions = ""
    product.instance.belongingOptions.forEach(
      (belongingOption: OptionConcat) => {
        product.options.forEach((option: Option) => {
          if (option.id === belongingOption.optionId) {
            option.optionValues.forEach(
              (optionValue: {value: string; id: number}) => {
                if (optionValue.id === belongingOption.valueId) {
                  belongingOptions += `${option.name} ${optionValue.value}`
                }
              }
            )
          }
        })
      }
    )
    product.instance.notBelongingOptions.forEach(
      (notBelongingOption: OptionConcat) => {
        product.options.forEach((option: Option) => {
          if (option.id === notBelongingOption.optionId) {
            option.optionValues.forEach(
              (optionValue: {value: string; id: number}) => {
                if (optionValue.id === notBelongingOption.valueId) {
                  notBelongingOptions = `${notBelongingOptions} ${
                    option.name
                  } ${optionValue.value}`
                }
              }
            )
          }
        })
      }
    )
    return `${belongingOptions} ${notBelongingOptions}`
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
