import {createSelector} from "reselect"

const selectLayoutDomain = (state: any) => state.get("geolocation")

export const selectCitiesStatus = createSelector(
  selectLayoutDomain,
  citiesStatus => citiesStatus.get("citiesStatus")
)

export const selectCities = createSelector(
  selectLayoutDomain,
  cities => cities.get("cities").toJS()
)

export const selectDefaultCity = createSelector(
  selectLayoutDomain,
  defaultCity =>
    defaultCity.get("defaultCity") !== null &&
    defaultCity.get("defaultCity").toJS()
)

export const selectAvailableTime = createSelector(
  selectLayoutDomain,
  isDeliveryAvailable => isDeliveryAvailable.get("isDeliveryAvailable")
)
