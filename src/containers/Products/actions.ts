import {Dispatch} from "redux"
import {State} from "../.."
import requests from "../../services/requests"
import {Status} from "../../constants"
import {ActionType} from "./constants"

export interface Category {
  name: string
  id: number
  url: string
  imgUrl: string
  optionNames: OptionName[]
  subcategories: Subcategory[]
  products: Product[]
  productsStatus: string
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

const setProductsStatus = (category: Category, productsStatus: string) => ({
  type: ActionType.SET_PRODUCTS_STATUS,
  payload: {
    category,
    productsStatus,
  },
})

export const getProducts = (category: Category) => (
  dispatch: Dispatch<State>
) => {
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

// export const getProductsAfterCategoryClick = (category: Category) => (
//   dispatch: any
// ) => {
//   if (
//     category.productsStatus === Status.NOT_LOADED ||
//     category.productsStatus === Status.LOADING_ERROR
//   ) {
//     dispatch(getProducts(category))
//   }
// }
// export const getCategories = () => (dispatch: Dispatch<State>) => {
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
