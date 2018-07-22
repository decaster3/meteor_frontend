import {Dispatch} from "redux"
import {State} from "../.."
import {ActionType} from "./constants"
import {Status, categoriesData} from "../../constants"
import requests from "../../services/requests"
import moment from "moment"
import {clearCart} from "../Cart/actions"

// @ts-ignore
import Geocode from "react-geocode"
import {getProducts} from "../Products/actions"

Geocode.setApiKey("AIzaSyDeRt-ekVSI0anD_b1zE5Kl7WobsRGutvc")
Geocode.enableDebug()

export const citiesData = [
  {
    id: 1,
    name: "Алматы",
    phone: "+7 987 043 21 12",
    currency: "тенге",
    googleKey: "Almaty",
    opensAt: moment.utc("07:00", "HH:mm"),
    closesAt: moment.utc("03:00", "HH:mm"),
  },
  {
    id: 2,
    name: "Бишкек",
    phone: "+7 987 043 21 12",
    currency: "сом",
    googleKey: "Bishkek",
    opensAt: moment.utc("07:00", "HH:mm"),
    closesAt: moment.utc("03:00", "HH:mm"),
  },
  {
    id: 3,
    name: "Астана",
    phone: "+7 987 043 21 12",
    currency: "тенге",
    googleKey: "Astana",
    opensAt: moment.utc("07:00", "HH:mm"),
    closesAt: moment.utc("03:00", "HH:mm"),
  },
]

export interface City {
  currency: string
  name: string
  phone: string
  googleKey: string
  id: number
  opensAt: moment.Moment
  closesAt: moment.Moment
}

export const checkTime = () => (dispatch: Dispatch<State>, getState: any) => {
  const currentTime = moment()
  const currentSchedule = {
    opensAt: moment(
      getState()
        .get("geolocation")
        .get("defaultCity")
        .get("opensAt")
    ),
    closesAt: moment(
      getState()
        .get("geolocation")
        .get("defaultCity")
        .get("closesAt")
    ),
  }
  return (
    minutesOfDay(currentTime) < minutesOfDay(currentSchedule.closesAt) &&
    minutesOfDay(currentTime) > minutesOfDay(currentSchedule.opensAt)
  )
}

const minutesOfDay = (m: moment.Moment) => m.minutes() + m.hours() * 60

export const setDeterminedCity = (city: City) => ({
  type: ActionType.SET_DETERMINED_CITY,
  payload: city,
})

const changeDeterminedCityStatus = (status: string) => ({
  type: ActionType.SET_DETERMINED_CITY_STATUS,
  payload: status,
})

export const setDefaultCity = (city: City) => (
  dispatch: Dispatch<State>,
  getState: any
) => {
  if (
    getState()
      .get("geolocation")
      .get("defaultCity") !== null &&
    getState()
      .get("geolocation")
      .get("defaultCity")
      .toJS().id !== city.id
  ) {
    dispatch(clearCart())
  }
  dispatch({
    type: ActionType.SET_DEFAULT_CITY,
    payload: city,
  })
  const currentUrl = getState()
    .get("route")
    .get("location")
    .get("pathname")
  const currentCategory = findCategoryByUrl(currentUrl)
  dispatch(getProducts(currentCategory))
}

const findCategoryByUrl = (url: string) => {
  return (
    categoriesData.find(category => category.url === url) || categoriesData[0]
  )
}

export const changeNavigationStatus = (status: boolean) => ({
  type: ActionType.CHANGE_NAVIGATION_STATUS,
  payload: status,
})

export const tryToGuessProbableCity = () => (dispatch: Dispatch<State>) => {
  dispatch(changeDeterminedCityStatus(Status.LOADING))
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      let isCityFound = false
      Geocode.fromLatLng(
        position.coords.latitude,
        position.coords.longitude
      ).then(
        (response: any) => {
          response.results[0].address_components.forEach((address: any) => {
            if (
              address.types.includes("locality") &&
              address.types.includes("political")
            ) {
              citiesData.forEach((city: City) => {
                if (city.googleKey === address.long_name) {
                  dispatch(setDeterminedCity(city))
                  dispatch(changeDeterminedCityStatus(Status.LOADED))
                  isCityFound = true
                }
              })
            }
          })
        },
        () => {
          dispatch(changeDeterminedCityStatus(Status.LOADING_ERROR))
        }
      )
      if (!isCityFound) {
        dispatch(changeDeterminedCityStatus(Status.LOADING_ERROR))
      }
    })
  } else {
    dispatch(changeNavigationStatus(false))
    dispatch(changeDeterminedCityStatus(Status.LOADING_ERROR))
  }
}

export const configureGeolocation = () => (dispatch: any, getState: any) => {
  if (
    !getState()
      .get("geolocation")
      .get("isCityChoosen")
  ) {
    dispatch(tryToGuessProbableCity())
  }
}
