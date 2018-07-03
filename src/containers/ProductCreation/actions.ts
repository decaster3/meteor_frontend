/*
 * User actions
 */
import {Dispatch} from "redux"
import {State} from "../../"
import requests from "../../services/requests"
import {Status} from "../../constants"
import {ActionType} from "./constants"
import {OptionName} from "../Product/actions"

const changeProductCreationStatus = (status: boolean) => ({
  type: ActionType.CHANGE_PRODUCT_CREATION_STATUS,
  payload: status,
})

export const createProduct = (image: any, product: any) => (
  dispatch: Dispatch<State>
) => {
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
