import requests from "../../services/requests"
import {Status} from "../../constants"
import {ActionType} from "./constants"

export interface Category {
  name: string
  id: number
  key: string
  imgUrl: string
  optionNames: OptionName[]
  subcategories: Subcategory[]
  products: Product[] | null
  error: Error | null
  isLoading: boolean
}

export interface Subcategory {
  id: number
  name: string
}

export interface Product {
  id: number
  name: string
  description: string
  imageUrl: string
  subcategories: Subcategory[]
  options: Option[]
  instances: ProductInstance[]
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
  price: Price
  independentOptions: OptionConcat[]
  dependentOptions: OptionConcat[]
}

export interface Price {
  currency: string
  value: number
}

export interface OptionConcat {
  optionId: number
  valueId: number
  value: string
}

export interface OptionName {
  id: number
  name: string
  isCharacteristic: boolean
  value?: string
}

export const clearProducts = () => ({type: ActionType.CLEAR_PRODUCTS})

const setProductsStatus = (category: Category, isLoading: boolean) => ({
  type: ActionType.SET_PRODUCTS_STATUS,
  payload: {
    category,
    isLoading,
  },
})

const setProductsError = (category: Category, error: Error) => ({
  type: ActionType.SET_ERROR,
  payload: {
    category,
    error,
  },
})

export const getProducts = (category: Category) => (
  dispatch: any,
  getState: any
) => {
  dispatch(setProductsStatus(category, true))
  const currentCiytyId =
    (getState()
      .get("geolocation")
      .get("defaultCity") &&
      getState()
        .get("geolocation")
        .get("defaultCity")
        .get("id")) ||
    1
  return requests
    .get(`products?category_id=${category.id}&city_id=${currentCiytyId}`)
    .then(data => {
      dispatch({
        type: ActionType.SET_PRODUCTS,
        payload: {
          category,
          products: data,
        },
      })
      dispatch(setProductsStatus(category, false))
    })
    .catch(error => {
      dispatch(setProductsStatus(category, false))
      dispatch(setProductsError(category, error))
    })
}

// export const getProductsAfterCategoryClick = (category: Category) => (
//   dispatch: any
// ) => {
//   if (
//     category.isLoading === Status.NOT_LOADED ||
//     category.isLoading === Status.LOADING_ERROR
//   ) {
//     dispatch(getProducts(category))
//   }
// }
// export const getCategories = () => (dispatch: any) => {
//   dispatch(setCategoriesStatus(Status.LOADING))
// return requests
//   .get("categories")
//   .then(data => {
// return dispatch({
//   type: ActionType.SET_CATEGORIES,
//   payload: categories,
// })
//   dispatch(setCategoriesStatus(Status.LOADED))
//   return data
// })
// .catch(() => {
//   dispatch(setCategoriesStatus(Status.LOADING_ERROR))
// })
// }

// export const configureCategoriesProducts = () => (
//   dispatch: any,
//   getState: any
// ) => {
//   dispatch(getCategories())
//     .then((data: Category[]) => {
//       dispatch(getProducts(data[0]))
//       return data
//     })
//     .then((data: Category[]) => {
//       Promise.all(
//         data.slice(1).map(category => dispatch(getProducts(category)))
//       )
//     })
//     .catch(() => console.log(Status.LOADING_ERROR))
// }
