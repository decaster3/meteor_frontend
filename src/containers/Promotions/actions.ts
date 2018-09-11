import {Status} from "../../constants"
import {ActionType} from "./constants"
import requests from "../../services/requests"

export interface Promotion {
  id: number
  imageUrl: string
  description: string
  name: string
}

const setIsLoading = (isLoading: boolean) => ({
  type: ActionType.SET_PROMOTIONS_STATUS,
  payload: isLoading,
})
const setError = (error: Error) => ({
  type: ActionType.SET_ERROR,
  payload: error,
})

export const getPromotions = () => (dispatch: any, getState: any) => {
  dispatch(setIsLoading(true))
  const cityId =
    getState()
      .get("geolocation")
      .get("defaultCity") !== null &&
    getState()
      .get("geolocation")
      .get("defaultCity")
      .get("id")
  return requests
    .get(`promotions?city_id=${cityId}`)
    .then((data: Promotion[]) => {
      dispatch({
        type: ActionType.SET_PROMOTIONS,
        payload: data,
      })
      dispatch(setIsLoading(false))
      return data
    })
    .catch(error => {
      dispatch(setIsLoading(false))
      dispatch(setError(error))
    })
}
