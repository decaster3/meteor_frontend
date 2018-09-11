import {ActionType} from "./constants"
import {Status, categoriesData} from "../../constants"
import moment from "moment"
import {clearCart} from "../Cart/actions"

// @ts-ignore
import Geocode from "react-geocode"
import {getProducts, clearProducts} from "../Products/actions"

Geocode.setApiKey("AIzaSyDeRt-ekVSI0anD_b1zE5Kl7WobsRGutvc")
export const citiesData = [
  {
    id: 1,
    name: "Алматы",
    phone: "+7 987 043 21 12",
    currency: "тенге",
    googleKey: "Almaty",
    minimalOrderPrice: 3000,
    schedule: [
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("6:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("03:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("03:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("3:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("3:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("03:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("6:00", "HH:mm"),
      },
    ],
  },
  {
    id: 2,
    name: "Бишкек",
    phone: "+7 987 043 21 12",
    currency: "сом",
    googleKey: "Bishkek",
    minimalOrderPrice: 3000,
    schedule: [
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("03:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("03:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("03:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("03:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("03:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("03:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("03:00", "HH:mm"),
      },
    ],
  },
  {
    id: 3,
    name: "Астана",
    phone: "+7 987 043 21 12",
    currency: "тенге",
    googleKey: "Astana",
    minimalOrderPrice: 3000,
    schedule: [
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("03:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("03:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("03:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("03:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("03:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("03:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("03:00", "HH:mm"),
      },
    ],
  },
]

export interface City {
  currency: string
  name: string
  phone: string
  googleKey: string
  id: number
  minimalOrderPrice: number
  schedule: AvailableTime[]
}
export interface AvailableTime {
  opensAt: moment.Moment
  closesAt: moment.Moment
}

export const checkTime = () => (dispatch: any, getState: any) => {
  const currentTime = moment()
  const currentDay = moment().isoWeekday()
  const currentSchedule = {
    opensAt: moment(
      getState()
        .get("geolocation")
        .get("defaultCity")
        .get("schedule")
        .toJS()[currentDay - 1].opensAt
    ),
    closesAt: moment(
      getState()
        .get("geolocation")
        .get("defaultCity")
        .get("schedule")
        .toJS()[currentDay - 1].closesAt
    ),
  }
  if (
    compareTime(currentSchedule.opensAt, currentSchedule.closesAt, currentTime)
  ) {
    dispatch({type: ActionType.CHANGE_AVAILABLE_TIME_STATUS, payload: true})
  } else {
    dispatch({type: ActionType.CHANGE_AVAILABLE_TIME_STATUS, payload: false})
  }
}

const compareTime = (
  time1: moment.Moment,
  time2: moment.Moment,
  time3: moment.Moment
) => {
  const minutes1 = minutesOfDay(time1)
  const minutes3 = minutesOfDay(time3)
  let minutes2 = minutesOfDay(time2)
  if (minutes2 < minutes1) {
    minutes2 += 60 * 24
  }
  if (minutes3 > minutes1 && minutes3 < minutes2) {
    return true
  }
  return false
}

const minutesOfDay = (m: moment.Moment) => {
  return m.minutes() + m.hours() * 60
}

export const setDeterminedCity = (city: City) => ({
  type: ActionType.SET_DETERMINED_CITY,
  payload: city,
})

const changeDeterminedCityStatus = (status: string) => ({
  type: ActionType.SET_DETERMINED_CITY_STATUS,
  payload: status,
})

export const setDefaultCity = (city: City) => (
  dispatch: any,
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
  const currentKey = location.pathname.split("/").filter(x => x)[0]
  const currentCategory = findCategoryByKey(currentKey)
  dispatch(clearProducts())
  dispatch(getProducts(currentCategory))
}

const findCategoryByKey = (key: string) => {
  return (
    categoriesData.find(category => category.key === key) || categoriesData[0]
  )
}

export const changeNavigationStatus = (status: boolean) => ({
  type: ActionType.CHANGE_NAVIGATION_STATUS,
  payload: status,
})

export const tryToGuessProbableCity = () => (dispatch: any) => {
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
