import {Dispatch} from "redux"
import {State} from "../.."
import {Status, categoriesData} from "../../constants"
import {ActionType} from "./constants"

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
  // return requests
  //   .get("categories")
  //   .then(data => {
  dispatch({
    type: ActionType.SET_CATEGORIES,
    payload: categoriesData,
  })
  dispatch(setCategoriesStatus(Status.LOADED))
  //   return data
  // })
  // .catch(() => {
  //   dispatch(setCategoriesStatus(Status.LOADING_ERROR))
  // })
}
