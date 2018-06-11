import {createSelector} from "reselect"
import {OrderStatus} from "./constants"

export const selectCheckoutDomain = (state: any) => state.get("checkout")

export const selectStreets = createSelector(selectCheckoutDomain, streets => {
  return streets.get("streets").toJS()
})

export const selectIsOrderPending = createSelector(
  selectCheckoutDomain,
  isOrderPending => {
    return isOrderPending.get("orderStatus") === OrderStatus.PROCESSING
      ? true
      : false
  }
)

export const selectStreetsStatus = createSelector(
  selectCheckoutDomain,
  streetsStatus => {
    return streetsStatus.get("streetsStatus")
  }
)

export const selectOrderStatus = createSelector(
  selectCheckoutDomain,
  orderStatus => {
    return orderStatus.get("orderStatus")
  }
)
