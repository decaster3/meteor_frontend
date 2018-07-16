import {createSelector} from "reselect"

export const selectCartDomain = (state: any) => state.get("cart")
export const selectUserDomain = (state: any) => state.get("userSession")

export const selectMeteors = createSelector(selectCartDomain, cart => {
  return cart.get("meteors")
})

export const selectTotal = createSelector(selectCartDomain, cart =>
  cart.get("total")
)

export const selectProducts = createSelector(selectCartDomain, cart =>
  cart.get("products").toJS()
)

export const selectPossibleMeteors = createSelector(
  selectUserDomain,
  user => 400
  // user.get("userInfo").get("meteors") &&
  // user
  //   .get("userInfo")
  //   .get("meteors")
  //   .toJS()[0].value
)
