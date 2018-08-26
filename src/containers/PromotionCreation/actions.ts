import requests from "../../services/requests"
import {ActionType} from "./constants"

const changePromotionCreationStatus = (status: boolean) => ({
  type: ActionType.CHANGE_PROMOTION_CREATION_STATUS,
  payload: status,
})

export const createPromotion = (
  image: any,
  description: string,
  name: string
) => (dispatch: any, getState: any) => {
  const cityId =
    (getState()
      .get("geolocation")
      .get("defaultCity") &&
      getState()
        .get("geolocation")
        .get("defaultCity")
        .get("id")) ||
    1
  return requests
    .post("promotions", {body: {description, name, cityId}})
    .then(data => {
      const body = new FormData()
      body.append(`image`, image[0])
      return requests.put(`promotions/${data.id}`, {body}).then(() => {
        dispatch(changePromotionCreationStatus(true))
      })
    })
    .catch(err => console.log("FAILED CREATE promotion", err))
}
