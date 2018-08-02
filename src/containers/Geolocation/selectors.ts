import {createSelector} from "reselect"
import {isNullOrUndefined} from "util"

const selectLayoutDomain = (state: any) => state.get("geolocation")

export const selectCitiesStatus = createSelector(
  selectLayoutDomain,
  citiesStatus => citiesStatus.get("citiesStatus")
)

export const selectCities = createSelector(selectLayoutDomain, cities =>
  cities.get("cities").toJS()
)

export const selectDefaultCity = createSelector(
  selectLayoutDomain,
  defaultCity =>
    defaultCity.get("defaultCity") !== null &&
    defaultCity.get("defaultCity").toJS()
)

export const selectProbableCity = createSelector(
  selectLayoutDomain,
  probableCity => probableCity.get("probableCity")
)
export const selectAvailableTime = createSelector(
  selectLayoutDomain,
  isDeliveryAvailable => isDeliveryAvailable.get("isDeliveryAvailable")
)

export const selectProbableCityStatus = createSelector(
  selectLayoutDomain,
  probableCityStatus => probableCityStatus.get("probableCityStatus")
)

export const selectIsNavigationAllowed = createSelector(
  selectLayoutDomain,
  isNavigationAllowed => isNavigationAllowed.get("isNavigationAllowed")
)

export const selectShowModal = createSelector(selectLayoutDomain, state => {
  if (state.get("defaultCity") === null) {
    return true
  }
  return false
})
