import {createSelector} from "reselect"

/*
 * Direct selector to the user state domain
 */
export const selectMenuDomain = (state: any) => state.get("products")

/*
 * Other specific selectors
 */

/*
 * Default selector used by User
 */

export const selectCategories = createSelector(selectMenuDomain, categories => {
  return categories.get("categories").toJS()
})

export const selectCurrentCategoryId = createSelector(
  selectMenuDomain,
  currentCategoryId => currentCategoryId.get("currentCategoryId")
)
