import {createSelector} from "reselect"

export const selectCartDomain = (state: any) => state.get("cart")
export const selectState = (state: any) => state

export const selectMeteors = createSelector(selectCartDomain, cart => {
  return cart.get("meteors")
})

export const selectTotal = createSelector(selectCartDomain, cart =>
  cart.get("total")
)

export const selectProducts = createSelector(selectCartDomain, cart =>
  cart.get("products").toJS()
)

export const selectPossibleMeteors = createSelector(selectState, state => {
  // if (
  //   state
  //     .get("userSession")
  //     .get("userInfo")
  //     .get("totalMeteors")
  // ) {
  //   const possibleCityMeteors = state
  //     .get("userSession")
  //     .get("userInfo")
  //     .get("totalMeteors")
  //     .toJS()
  //     .find(
  //       (meteor: {cityId: number; value: number}) =>
  //         meteor.cityId ===
  //         state
  //           .get("geolocation")
  //           .get("defaultCity")
  //           .get("id")
  //     )
  //   if (possibleCityMeteors) {
  //     return possibleCityMeteors.value
  //   }
  // }
  return 5000
})
