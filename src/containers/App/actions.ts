/*
 *
 * User actions
 *
 */
import {Dispatch} from "redux"
import {State} from "../../"
import {Action} from "./constants"
import {Status} from "../../constants"
import requests from "../../services/requests"

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
  type: Action.SET_CITIES_STATE,
  payload: state,
})
const changeCategoriesState = (state: string) => ({
  type: Action.SET_CATEGORIES_STATE,
  payload: state,
})

export const setCities = () => (dispatch: Dispatch<State>) => {
  dispatch(changeCitiesState(Status.LOADING))
  requests
    .get("cities")
    .then(data => {
      dispatch({
        type: Action.SET_CITIES,
        payload: data,
      })
      dispatch(changeCitiesState(Status.LOADED))
    })
    .catch(() => dispatch(changeCitiesState(Status.LOADING_ERROR)))
}

export const setCategories = () => (dispatch: Dispatch<State>) => {
  dispatch(changeCategoriesState(Status.LOADING))
  requests
    .get("categories")
    .then(data => {
      dispatch({
        type: Action.SET_CATEGORIES,
        payload: data,
      })
    })
    .catch(() => dispatch(changeCategoriesState(Status.LOADING_ERROR)))
  dispatch(changeCategoriesState(Status.LOADED))
}
