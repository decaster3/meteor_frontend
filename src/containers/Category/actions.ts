/*
 * User actions
 */
// @ts-ignore
import Geocode from "react-geocode"
import {Dispatch} from "redux"
import {State} from "../../"
import requests from "../../services/requests"
import {Status} from "../../constants"
import {ActionType} from "./constants"

export interface Category {
  name: string
  id: number
  products: Product[]
  productsStatus: string
}
export interface Product {
  id: number
  name: string
  description: string
  options: Option[]
  instances: ProductInstance[]
}
export interface Option {
  name: string
  id: number
  isCharacteristic: boolean
  optionValues: Array<{value: string; id: number}>
}

export interface ProductInstance {
  id: number
  price: {currency: string; value: string; id: number}
  belongingOptions: OptionConcat[]
  notBelongingOptions: OptionConcat[]
}

export interface OptionConcat {
  optionId: number
  valueId: number
}
const setCategoriesStatus = (categoriesStatus: string) => ({
  type: ActionType.SET_CATEGORIES_STATUS,
  payload: categoriesStatus,
})

export const getCategories = () => (dispatch: Dispatch<State>) => {
  dispatch(setCategoriesStatus(Status.LOADING))
  return requests
    .get("categories")
    .then(data => {
      dispatch({
        type: ActionType.SET_CATEGORIES,
        payload: data.map((category: {name: string; id: number}) => ({
          id: category.id,
          name: category.name,
          productsStatus: Status.NOT_LOADED,
          products: [],
        })),
      })
      dispatch(setCategoriesStatus(Status.LOADED))
      return data
    })
    .catch(() => {
      dispatch(setCategoriesStatus(Status.LOADING_ERROR))
    })
}
