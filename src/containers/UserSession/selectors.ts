import {createSelector} from "reselect"

/*
 * Direct selector to the user state domain
 */
export const selectUserDomain = (state: any) => state.get("userSession")

/*
 * Other specific selectors
 */

/*
 * Default selector used by User
 */

export const selectUserState = createSelector(selectUserDomain, userState =>
  userState.get("userState")
)
