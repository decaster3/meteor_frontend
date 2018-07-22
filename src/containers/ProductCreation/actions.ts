import requests from "../../services/requests"
import {ActionType} from "./constants"

const changeProductCreationStatus = (status: boolean) => ({
  type: ActionType.CHANGE_PRODUCT_CREATION_STATUS,
  payload: status,
})

export const createProduct = (image: any, product: any) => (dispatch: any) => {
  return requests
    .post("products", {body: product})
    .then(data => {
      const body = new FormData()
      body.append(`image`, image[0])
      return requests.put(`products/${data.id}`, {body}).then(() => {
        dispatch(changeProductCreationStatus(true))
      })
    })
    .catch(err => console.log("FAILED CREATE PRODUCT", err))
}
