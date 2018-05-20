import {createSelector} from "reselect"

/*
 * Direct selector to the user state domain
 */
export const selectMenuDomain = (state: any) => state.get("menu")

/*
 * Other specific selectors
 */

/*
 * Default selector used by User
 */

export const selectCategories = createSelector(selectMenuDomain, categories =>
  categories.get("categories").toJS()
)
export const selectCategoriesStatus = createSelector(
  selectMenuDomain,
  categoriesStatus => categoriesStatus.get("categoriesStatus")
)
