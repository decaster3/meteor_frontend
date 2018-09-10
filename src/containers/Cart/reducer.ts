import {fromJS} from "immutable"
import _ from "lodash"
import {ActionType} from "./constants"
import {AnyAction} from "redux"
import {CartProduct} from "./actions"

const initialState = fromJS({
  products: [],
  total: 0,
  meteors: 0,
})

const compareProducts = (products: CartProduct[], product2: CartProduct) => {
  return products.findIndex((product: CartProduct) =>
    _.isEqual(
      {id: product.id, instance: product.instances[0]},
      {id: product2.id, instance: product2.instances[0]}
    )
  )
}

const getTotalCart = (state: any) => {
  const products = state.get("products").toJS()
  const meteors = state.get("meteors")
  let total = 0
  products.forEach((product: CartProduct) => {
    const quantity = product.count || 1
    total += product.instances[0].price.value * quantity
  })
  return total
}

const cartReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.CHANGE_METEORS: {
      return state.set("meteors", fromJS(action.payload))
    }
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
      if (potentialIndex !== -1) {
        if (currentCartProducts[potentialIndex].count === 1) {
          // currentCartProducts.splice(potentialIndex, 1)
        } else {
          currentCartProducts[potentialIndex].count -= 1
        }
      }
      return state.set("products", fromJS(currentCartProducts))
    }
    case ActionType.DELETE_PRODUCT: {
      const currentCartProducts = state.get("products").toJS()
      const potentialIndex = compareProducts(
        currentCartProducts,
        action.payload
      )
      if (potentialIndex !== -1) {
        currentCartProducts.splice(potentialIndex, 1)
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
