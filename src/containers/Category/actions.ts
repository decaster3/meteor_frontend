import {Dispatch} from "redux"
import {State} from "../.."
import {Status, categoriesData} from "../../constants"
import {ActionType} from "./constants"

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
