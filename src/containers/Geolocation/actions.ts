/*
 * User actions
 */
// @ts-ignore
import Geocode from "react-geocode"
import {Dispatch} from "redux"
import {State} from "../../"
import {ActionType} from "./constants"
import {Status} from "../../constants"
import requests from "../../services/requests"
import {clearCart} from "../Cart/actions"

Geocode.setApiKey("AIzaSyDeRt-ekVSI0anD_b1zE5Kl7WobsRGutvc")
Geocode.enableDebug()

const mockCities = [
  {name: "KG", phone: "12313123", id: 1, key: "Innopolis"},
  {name: "KZ", phone: "12313213123", id: 2, key: "Moscow"},
]

export interface City {
  name: string
  phone: string
  key: string
  id: number
}

const changeCitiesStatus = (status: string) => ({
  type: ActionType.SET_CITIES_STATUS,
  payload: status,
})

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
      .get("defaultCity") &&
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
}

export const changeNavigationStatus = (status: boolean) => ({
  type: ActionType.CHANGE_NAVIGATION_STATUS,
  payload: status,
})

export const tryToGuesProbableCity = (cities: City[]) => (
  dispatch: Dispatch<State>
) => {
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
              cities.forEach((city: City) => {
                if (city.key === address.long_name) {
                  console.log(city)
                  dispatch(setDeterminedCity(city))
                  dispatch(changeDeterminedCityStatus(Status.LOADED))
                  isCityFound = true
                }
              })
            }
          })
        },
        (error: any) => {
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

export const setCities = () => (dispatch: Dispatch<State>) => {
  dispatch(changeCitiesStatus(Status.LOADING))
  return requests
    .get("cities")
    .then(data => {
      dispatch({
        type: ActionType.SET_CITIES,
        payload: data,
      })
      dispatch(changeCitiesStatus(Status.LOADED))
      return data
    })
    .catch(() => dispatch(changeCitiesStatus(Status.LOADING_ERROR)))
}

export const configureGeolocation = () => (dispatch: any, getState: any) => {
  dispatch(setCities()).then((data: City[]) => {
    console.log(data)
    dispatch(setDefaultCity(data[0]))
    if (
      getState()
        .get("geolocation")
        .get("determinedCity") === null
    ) {
      console.log(123123123123123123)
      dispatch(tryToGuesProbableCity(data))
    }
  })
}
