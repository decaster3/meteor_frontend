/*
 *
 * User actions
 *
 */
import {Dispatch} from "redux"
import {State} from "../../"
import Requests from "../../services/Requests"
import {AC, SC} from "./constants"

const mockCities = [
  {name: "KG", phone: "12313123", id: 1},
  {name: "KZ", phone: "12313213123", id: 2},
]

const mockCategories = [{name: "pizza", id: 1}, {name: "sushi", id: 2}]

export interface City {
  name: string
  phone: string
  id: number
}

export interface Category {
  name: string
  id: number
}

const changeCitiesState = (state: string) => ({
  type: AC.SET_CITIES_STATE,
  payload: state,
})
const changeCategoriesState = (state: string) => ({
  type: AC.SET_CATEGORIES_STATE,
  payload: state,
})

export const setCities = () => (dispatch: Dispatch<State>) => {
  dispatch(changeCitiesState(SC.LOADING))
  Requests.get("cities")
    .then(data => {
      dispatch({
        type: AC.SET_CITIES,
        payload: data,
      })
      dispatch(changeCitiesState(SC.LOADED))
    })
    .catch(() => dispatch(changeCitiesState(SC.LOADING_ERROR)))
}

export const setCategories = () => (dispatch: Dispatch<State>) => {
  dispatch(changeCategoriesState(SC.LOADING))
  Requests.get("categories")
    .then(data => {
      dispatch({
        type: AC.SET_CATEGORIES,
        payload: data,
      })
    })
    .catch(() => dispatch(changeCategoriesState(SC.LOADING_ERROR)))
  dispatch(changeCategoriesState(SC.LOADED))
}
