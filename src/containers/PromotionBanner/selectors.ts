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

export const selectBanners = createSelector(
  selectPromotionBannerDomain,
  banners => {
    return banners.get("banners").toJS()
  }
)
export const selectBannersStatus = createSelector(
  selectPromotionBannerDomain,
  bannersStatus => bannersStatus.get("bannersStatus")
)
