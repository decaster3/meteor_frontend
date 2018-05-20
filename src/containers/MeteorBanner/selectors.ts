import {createSelector} from "reselect"

const selectUserDomain = (state: any) => state.get("userSession")

export const selectUserState = createSelector(selectUserDomain, userState =>
  userState.get("userState")
)
export const selectUserInfo = createSelector(selectUserDomain, userState =>
  userState.get("userInfo")
)
