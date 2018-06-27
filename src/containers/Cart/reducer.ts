/*
 * User reducer
 */

import {fromJS} from "immutable"
import * as _ from "lodash"
import {ActionType} from "./constants"
import {Status} from "../../constants"
import {AnyAction} from "redux"
import {CartProduct} from "./actions"

const initialState = fromJS({
  products: [],
  total: 0,
})

const compareProducts = (products: CartProduct[], product2: CartProduct) => {
  return products.findIndex((product: CartProduct) =>
    _.isEqual(
      {id: product.id, instance: product.instance},
      {id: product2.id, instance: product2.instance}
    )
  )
}

const getTotalCart = (state: any) => {
  const products = state.get("products").toJS()
  const meteors = state.get("meteors")
  let total = 0
  products.forEach((product: CartProduct) => {
    total += parseInt(product.instance.price.value, 10) * product.count
  })
  return total
}

const cartReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.ADD_PRODUCT_TO_CART: {
      const currentCartProducts = state.get("products").toJS()
      const potentialIndex = compareProducts(
        currentCartProducts,
        action.payload
      )
      if (potentialIndex !== -1) {
        currentCartProducts[potentialIndex].count += 1
      } else {
        currentCartProducts.push(action.payload)
      }
      return state.set("products", fromJS(currentCartProducts))
    }
    case ActionType.REMOVE_PRODUCT_FROM_CART: {
      const currentCartProducts = state.get("products").toJS()
      const potentialIndex = compareProducts(
        currentCartProducts,
        action.payload
      )
      if (
        potentialIndex !== -1 &&
        currentCartProducts[potentialIndex].count !== 1
      ) {
        currentCartProducts[potentialIndex].count -= 1
      }
      return state.set("products", fromJS(currentCartProducts))
    }
    case ActionType.CLEAR_CART:
      return initialState
    case ActionType.UPDATE_TOTAL_CART:
      return state.set("total", fromJS(getTotalCart(state)))
    default:
      return state
  }
}

export default cartReducer
