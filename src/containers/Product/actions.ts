/*
 * User actions
 */
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
  independentOptions: OptionConcat[]
  dependentOptions: OptionConcat[]
}

export interface OptionConcat {
  optionId: number
  valueId: number
  value: string
}

const setCategoriesStatus = (categoriesStatus: string) => ({
  type: ActionType.SET_CATEGORIES_STATUS,
  payload: categoriesStatus,
})

const setProductsStatus = (category: Category, productsStatus: string) => ({
  type: ActionType.SET_PRODUCTS_STATUS,
  payload: {
    category,
    productsStatus,
  },
})

const getProducts = (category: Category) => (dispatch: Dispatch<State>) => {
  dispatch(setProductsStatus(category, Status.LOADING))
  return requests
    .get(`products?category_id=${category.id}&city_id=1`)
    .then(data => {
      dispatch({
        type: ActionType.SET_PRODUCTS,
        payload: {
          category,
          products: data,
        },
      })
      dispatch(setProductsStatus(category, Status.LOADED))
    })
    .catch(() => dispatch(setProductsStatus(category, Status.LOADING_ERROR)))
}

export const getProductsAfterCategoryClick = (category: Category) => (
  dispatch: any
) => {
  if (
    category.productsStatus === Status.NOT_LOADED ||
    category.productsStatus === Status.LOADING_ERROR
  ) {
    dispatch(getProducts(category))
  }
}

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
      return Promise.reject(Error(Status.LOADING_ERROR))
    })
}

export const configureCategoriesProducts = () => (
  dispatch: any,
  getState: any
) => {
  dispatch(getCategories())
    .then((data: Category[]) => {
      dispatch(getProducts(data[0]))
      return data
    })
    .then((data: Category[]) => {
      Promise.all(
        data.slice(1).map(category => dispatch(getProducts(category)))
      )
    })
    .catch(() => console.log(Status.LOADING_ERROR))
}
