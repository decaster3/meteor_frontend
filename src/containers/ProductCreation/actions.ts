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

export const createProduct = (photo: any, product: any) => (
  dispatch: Dispatch<State>
) => {
  return requests
    .post("products", {body: product})
    .then(data => {
      return requests.put(`product/${data.id}`, {body: photo}).then(() => {
        dispatch(changeProductCreationStatus(true))
      })
    })
    .catch(() => console.log("FAILED CREATE PRODUCT"))
}
