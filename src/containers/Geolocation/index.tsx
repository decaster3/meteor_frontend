/*
 * User
 */
import React from "react"
import {connect} from "react-redux"
import {compose, Dispatch} from "redux"
import {State} from "../.."
import {
  selectCitiesStatus,
  selectCities,
  selectShowModal,
  selectIsNavigationAllowed,
  selectProbableCityStatus,
  selectProbableCity,
  selectDefaultCity,
} from "./selectors"
import {configureGeolocation, setDefaultCity, City} from "./actions"

export interface GeolocationStateProps {
  cities: City[]
  citiesStatus: string
  defaultCity: City
  probableCity: City
  probableCityStatus: string
  isNavigationAllowed: boolean
  showModal: boolean
}

export interface GeolocationDispatchProps {
  configureGeolocation(): void
  setDefaultCity(city: City): void
}

export interface GeolocationProps
  extends GeolocationStateProps,
    GeolocationDispatchProps {}

const withGeolocation = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class WithGeolocationContainer extends React.Component<
    GeolocationProps & P
  > {
    componentDidMount() {
      this.props.configureGeolocation()
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

const mapStateToProps = (state: State): GeolocationStateProps => {
  return {
    citiesStatus: selectCitiesStatus(state),
    cities: selectCities(state),
    showModal: selectShowModal(state),
    isNavigationAllowed: selectIsNavigationAllowed(state),
    probableCityStatus: selectProbableCityStatus(state),
    probableCity: selectProbableCity(state),
    defaultCity: selectDefaultCity(state),
  }
}

const mapDispatchToProps = (dispatch: any): GeolocationDispatchProps => {
  return {
    configureGeolocation: () => dispatch(configureGeolocation()),
    setDefaultCity: (city: City) => dispatch(setDefaultCity(city)),
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withGeolocation
)
