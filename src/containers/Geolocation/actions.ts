import {ActionType} from "./constants"
import {Status, categoriesData, citiesData} from "../../constants"
import moment from "moment"
import {clearCart} from "../Cart/actions"

import {getProducts, clearProducts} from "../Products/actions"
export interface City {
  currency: string
  name: string
  phone: string
  googleKey: string
  id: number
  minimalOrderPrice: number
  registrationBonus: number
  inviteBonus: number
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
  console.log(
    getState()
      .get("geolocation")
      .get("defaultCity")
      .get("schedule")
      .toJS()[currentDay - 1].closesAt
  )
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
  console.log("MIN", minutes1, minutes2, minutes3)
  if (minutes3 > minutes1 && minutes3 < minutes2) {
    return true
  }
  return false
}

const minutesOfDay = (m: moment.Moment) => {
  return m.minutes() + m.hours() * 60
}

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
