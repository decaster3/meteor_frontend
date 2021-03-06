import {createSelector} from "reselect"

/*
 * Direct selector to the user state domain
 */
export const selectUserDomain = (state: any) => state.get("userSession")
export const selectState = (state: any) => state

export const selectUserState = createSelector(selectUserDomain, userState =>
  userState.get("userState")
)

export const selectUserInfo = createSelector(selectUserDomain, userInfo =>
  userInfo.get("userInfo").toJS()
)
export const selectUserInfoStatus = createSelector(selectUserDomain, userInfo =>
  userInfo.get("userInfo").get("userInfoStatus")
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

export const selectPossibleMeteors = createSelector(selectState, state => {
  if (
    state
      .get("userSession")
      .get("userInfo")
      .get("totalMeteors")
  ) {
    const possibleCityMeteors = state
      .get("userSession")
      .get("userInfo")
      .get("totalMeteors")
      .toJS()
      .find(
        (meteor: {cityId: number; value: number}) =>
          meteor.cityId ===
          state
            .get("geolocation")
            .get("defaultCity")
            .get("id")
      )
    if (possibleCityMeteors) {
      return possibleCityMeteors.value
    }
  }
  return 0
})
