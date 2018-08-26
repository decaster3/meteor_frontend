import {Status} from "../../constants"
import {ActionType} from "./constants"
import requests from "../../services/requests"

export interface Promotion {
  id: number
  imageUrl: string
  description: string
  name: string
}

const setPromotionsStatus = (PromotionsStatus: string) => ({
  type: ActionType.SET_PROMOTIONS_STATUS,
  payload: PromotionsStatus,
})

export const getPromotions = () => (dispatch: any, getState: any) => {
  dispatch(setPromotionsStatus(Status.LOADING))
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
      dispatch(setPromotionsStatus(Status.LOADED))
      return data
    })
    .catch(() => dispatch(setPromotionsStatus(Status.LOADING_ERROR)))
}
