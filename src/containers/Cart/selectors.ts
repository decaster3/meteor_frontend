import {createSelector} from "reselect"

export const selectCartDomain = (state: any) => state.get("cart")

export const selectMeteors = createSelector(selectCartDomain, meteors => {
  return meteors.get("meteors")
})
export const selectTotal = createSelector(selectCartDomain, total =>
  total.get("total")
)
export const selectProducts = createSelector(selectCartDomain, products =>
  products.get("products").toJS()
)
export const selectPossibleMeteors = createSelector(
  selectCartDomain,
  products => 400
)
