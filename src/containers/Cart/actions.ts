/*
 * User actions
 */
import {Dispatch} from "redux"
import {State} from "../.."
import requests from "../../services/requests"
import {ActionType} from "./constants"

export interface CartProduct {
  id: number
  name: string
  description: string
  options: Option[]
  instance: ProductInstance
  count: number
  price: {currency: string; value: string; id: number}
}

export interface Option {
  name: string
  id: number
  isCharacteristic: boolean
  optionValues: OptionValue[]
}

interface OptionValue {
  value: string
  id: number
}

export interface ProductInstance {
  id: number
  price: {currency: string; value: string; id: number}
  independentOptions: OptionConcat[]
  dependentOptions: OptionConcat[]
}

export interface OptionConcat {
  optionId: number
  valueId: number
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
