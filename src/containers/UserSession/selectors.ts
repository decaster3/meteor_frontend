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

export const selectIsPhonePending = createSelector(
  selectUserDomain,
  isPhonePending => isPhonePending.get("registration").get("isPhonePending")
)

export const selectIsCodePending = createSelector(
  selectUserDomain,
  isCodePending => isCodePending.get("registration").get("isCodePending")
)

export const selectIsLoginPending = createSelector(
  selectUserDomain,
  isCodePending => isCodePending.get("registration").get("isLoginPending")
)

export const selectInviterToken = createSelector(
  selectUserDomain,
  inviterToken => {
    if (
      inviterToken.get("registration").get("inviterToken") === "" ||
      inviterToken.get("registration").get("inviterToken") === null
    ) {
      return undefined
    }
    return inviterToken.get("registration").get("inviterToken")
  }
)

export const selectPhone = createSelector(selectUserDomain, phone =>
  phone.get("registration").get("phone")
)
