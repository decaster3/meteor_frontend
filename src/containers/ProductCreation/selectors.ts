import {createSelector} from "reselect"

/*
 * Direct selector to the user state domain
 */
export const selectProductCreationDomain = (state: any) =>
  state.get("productCreation")

export const selectIsProductCreating = createSelector(
  selectProductCreationDomain,
  isProductCreating => {
    return isProductCreating.get("isProductCreating")
  }
)
