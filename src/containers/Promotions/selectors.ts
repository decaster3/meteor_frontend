import {createSelector} from "reselect"

/*
 * Direct selector to the user state domain
 */
export const selectPromotionsDomain = (state: any) => state.get("promotions")

/*
 * Other specific selectors
 */

/*
 * Default selector used by User
 */

export const selectPromotions = createSelector(
  selectPromotionsDomain,
  promotions => {
    return promotions.get("promotions")
      ? promotions.get("promotions").toJS()
      : null
  }
)
export const selectPromotionsStatus = createSelector(
  selectPromotionsDomain,
  isLoading => isLoading.get("isLoading")
)
export const selectPromotionsError = createSelector(
  selectPromotionsDomain,
  error => error.get("error")
)
