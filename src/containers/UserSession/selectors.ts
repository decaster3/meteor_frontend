import {createSelector} from "reselect"

/*
 * Direct selector to the user state domain
 */
export const selectUserDomain = (state: any) => state.get("userSession")

export const selectUserState = createSelector(selectUserDomain, userState =>
  userState.get("userState")
)

export const selectUserRegistrationStep = createSelector(
  selectUserDomain,
  registrationStep =>
    registrationStep.get("registration").get("registrationStep")
)

export const selectCodeSentTime = createSelector(selectUserDomain, codeSent =>
  codeSent.get("registration").get("codeSent")
)
