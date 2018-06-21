/*
 * User actions
 */
import {Dispatch} from "redux"
import {State} from "../../"
import requests from "../../services/requests"
import {ActionType, OrderStatus} from "./constants"
import {CartProduct} from "../Cart/actions"
import {Status} from "../../constants"

export interface Order {
  address: Address
  orderProductsAttributes: ProductForOrder[]
  phone: string
  name: string
}

export interface Address {
  street: string
  building: string
  apartment: string
  comment: string
}
export interface ProductForOrder {
  quantity: number
  productInstanceId: number
}

const changeOrderStatus = (orderStatus: string) => ({
  type: ActionType.CHANGE_ORDER_STATUS,
  payload: orderStatus,
})

const changeStreetsStatus = (streetsStatus: string) => ({
  type: ActionType.CHANGE_STREETS_STATUS,
  payload: streetsStatus,
})
const mockStreets = [{value: "one", label: "One"}, {value: "two", label: "Two"}]

export const getStreets = () => (dispatch: Dispatch<State>, getState: any) => {
  dispatch(changeStreetsStatus(Status.LOADING))
  // requests
  //   .get("streets/1")
  //   .then(data => {
  dispatch({
    type: ActionType.SET_STREETS,
    payload: mockStreets,
  })
  dispatch(changeStreetsStatus(Status.LOADED))
  // })
  // .catch(() => {
  //   dispatch(changeStreetsStatus(Status.NOT_LOADED))
  // })
}

export const makeOrder = (address: Address, name: string, phone: string) => (
  dispatch: Dispatch<State>,
  getState: any
) => {
  dispatch(changeOrderStatus(OrderStatus.PROCESSING))
  const orderProductsAttributes = getState()
    .get("cart")
    .get("products")
    .toJS()
    .map((product: CartProduct) => ({
      quantity: product.count,
      productInstanceId: product.instance.id,
    }))
  const cityId =
    getState()
      .get("geolocation")
      .get("defaultCity") !== null &&
    getState()
      .get("geolocation")
      .get("defaultCity")
      .get("id")
  requests
    .post("orders", {
      body: {
        orderProductsAttributes,
        address: {...address, cityId},
        name,
        phone,
      },
    })
    .then(() => {
      dispatch(changeOrderStatus(OrderStatus.DODE))
    })
    .catch(() => {
      dispatch(changeOrderStatus(OrderStatus.NOT_DONE))
    })
}
