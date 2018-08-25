import {createSelector} from "reselect"

/*
 * Direct selector to the user state domain
 */
export const selectPromotionCreationDomain = (state: any) =>
  state.get("promotionCreation")

export const selectIsPromotionCreating = createSelector(
  selectPromotionCreationDomain,
  isPromotionCreating => {
    return isPromotionCreating.get("isPromotionCreating")
  }
)
