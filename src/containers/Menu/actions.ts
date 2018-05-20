/*
 * User actions
 */
import {Dispatch} from "redux"
import {State} from "../../"
import requests from "../../services/requests"
import {Status} from "../../constants"
import {ActionType} from "./constants"

const mockProducts = [
  {
    name: "Margarita",
    id: 1,
    description: "Awesome pizza",
    options: [
      {
        name: "size",
        id: 1,
        ifBelongs: true,
        values: [
          {value: "28", id: 1},
          {value: "32", id: 2},
          {value: "42", id: 3},
        ],
      },
      {
        name: "weight",
        id: 2,
        ifBelongs: false,
        values: [
          {value: "100", id: 4},
          {value: "200", id: 5},
          {value: "300", id: 6},
        ],
      },
    ],
    instances: [
      {
        id: 1,
        prices: {currency: "euro", value: "200", id: 1},
        options: [{option_id: 1, value_id: 1}, {option_id: 2, value_id: 4}],
      },
    ],
  },
  {
    name: "Dolce vita",
    id: 1,
    description: "Awesome pizza2",
    options: [
      {
        name: "size",
        id: 1,
        ifBelongs: true,
        values: [
          {value: "28", id: 1},
          {value: "32", id: 2},
          {value: "42", id: 3},
        ],
      },
      {
        name: "weight",
        id: 2,
        ifBelongs: false,
        values: [
          {value: "100", id: 4},
          {value: "200", id: 5},
          {value: "300", id: 6},
        ],
      },
    ],
    instances: [
      {
        id: 1,
        prices: {currency: "euro", value: "200", id: 1},
        options: [{option_id: 1, value_id: 1}, {option_id: 2, value_id: 4}],
      },
    ],
  },
]
export interface Category {
  name: string
  id: number
  products?: Product[]
  productsStatus: string
}
export interface Product {
  id: number
  name: string
  description: string
  options: Option[]
  instances: ProductInstance[]
}
interface Option {
  name: string
  id: number
  isBelongs: boolean
  values: Array<{value: string; id: number}>
}

interface ProductInstance {
  id: number
  price: {currency: string; value: string; id: number}
  options: OptionConcat[]
}

interface OptionConcat {
  option_id: number
  value_id: number
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
          products: mockProducts,
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
      const newData = data.map((category: {name: string; id: number}) => ({
        id: category.id,
        name: category.name,
        productsStatus: Status.NOT_LOADED,
      }))
      dispatch({
        type: ActionType.SET_CATEGORIES,
        payload: newData,
      })
      dispatch(setCategoriesStatus(Status.LOADED))
      return data
    })
    .catch(() => dispatch(setCategoriesStatus(Status.LOADING_ERROR)))
}

export const configureCategoriesProducts = () => (dispatch: any) => {
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
}
