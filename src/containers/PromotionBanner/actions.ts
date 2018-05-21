/*
 * User actions
 */
import {Dispatch} from "redux"
import {State} from "../../"
import requests from "../../services/requests"
import {Status} from "../../constants"
import {ActionType} from "./constants"

const setBannersStatus = (bannersStatus: string) => ({
  type: ActionType.SET_BANNERS_STATUS,
  payload: bannersStatus,
})

export const getBanners = () => (dispatch: Dispatch<State>) => {
  dispatch(setBannersStatus(Status.LOADING))
  // return requests
  //   .get("banners")
  //   .then(data => {
  //     dispatch({
  //       type: ActionType.SET_BANNERS,
  //       payload: data,
  //     })
  //     dispatch(setBannersStatus(Status.LOADED))
  //     return data
  //   })
  //   .catch(() => dispatch(setBannersStatus(Status.LOADING_ERROR)))
}
