import {createSelector} from "reselect"

/*
 * Direct selector to the user state domain
 */
export const selectPromotionBannerDomain = (state: any) =>
  state.get("promotionBanner")

/*
 * Other specific selectors
 */

/*
 * Default selector used by User
 */

export const selectPromotions = createSelector(
  selectPromotionBannerDomain,
  promotions => {
    return promotions.get("promotions").toJS()
  }
)
export const selectPromotionsStatus = createSelector(
  selectPromotionBannerDomain,
  promotionsStatus => promotionsStatus.get("promotionsStatus")
)
