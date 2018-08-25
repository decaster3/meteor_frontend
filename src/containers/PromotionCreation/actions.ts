import requests from "../../services/requests"
import {ActionType} from "./constants"

const changePromotionCreationStatus = (status: boolean) => ({
  type: ActionType.CHANGE_PROMOTION_CREATION_STATUS,
  payload: status,
})

export const createPromotion = (image: any, description: any) => (
  dispatch: any
) => {
  return requests
    .post("promotions", {body: description})
    .then(data => {
      const body = new FormData()
      body.append(`image`, image[0])
      return requests.put(`promotions/${data.id}`, {body}).then(() => {
        dispatch(changePromotionCreationStatus(true))
      })
    })
    .catch(err => console.log("FAILED CREATE promotion", err))
}
