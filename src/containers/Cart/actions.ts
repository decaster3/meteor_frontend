import {ActionType} from "./constants"
import {Option, ProductInstance} from "../Products/actions"

export interface CartProduct {
  id: number
  name: string
  description: string
  options: Option[]
  instances: ProductInstance[]
  imageUrl?: string | null
  count?: number
}

export const updateTotalCart = () => ({type: ActionType.UPDATE_TOTAL_CART})
export const clearCart = () => ({type: ActionType.CLEAR_CART})
export const changeMeteors = (meteors: number) => ({
  type: ActionType.CHANGE_METEORS,
  payload: meteors,
})
export const addProductToCart = (product: CartProduct) => (dispatch: any) => {
  dispatch({
    payload: product,
    type: ActionType.ADD_PRODUCT_TO_CART,
  })
  dispatch(updateTotalCart())
}

export const removeProductFromCart = (product: CartProduct) => (
  dispatch: any
) => {
  dispatch({
    payload: product,
    type: ActionType.REMOVE_PRODUCT_FROM_CART,
  })
  dispatch(updateTotalCart())
}
