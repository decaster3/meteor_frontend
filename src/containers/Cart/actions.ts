import {Dispatch} from "redux"
import {State} from "../.."
import {ActionType} from "./constants"
import {Option, ProductInstance} from "../Products/actions"

export interface CartProduct {
  id: number
  name: string
  description: string
  options: Option[]
  instances: ProductInstance[]
  count?: number
}

export const updateTotalCart = () => ({type: ActionType.UPDATE_TOTAL_CART})
export const clearCart = () => ({type: ActionType.CLEAR_CART})

export const addProductToCart = (product: CartProduct) => (
  dispatch: Dispatch<State>
) => {
  dispatch({
    payload: product,
    type: ActionType.ADD_PRODUCT_TO_CART,
  })
  dispatch(updateTotalCart())
}

export const removeProductFromCart = (product: CartProduct) => (
  dispatch: Dispatch<State>
) => {
  dispatch({
    payload: product,
    type: ActionType.REMOVE_PRODUCT_FROM_CART,
  })
  dispatch(updateTotalCart())
}
