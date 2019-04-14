import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {
  selectCitiesStatus,
  selectCities,
  selectDefaultCity,
  selectAvailableTime,
} from "./selectors"
import {setDefaultCity, City, checkTime} from "./actions"

interface GeolocationStateProps {
  cities: City[]
  citiesStatus: string
  defaultCity: City
  isDeliveryAvailable: boolean
}

interface GeolocationDispatchProps {
  setDefaultCity(city: City): void
  checkTime(): void
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
      this.props.checkTime()
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

const mapStateToProps = (state: any): GeolocationStateProps => {
  return {
    citiesStatus: selectCitiesStatus(state),
    cities: selectCities(state),
    defaultCity: selectDefaultCity(state),
    isDeliveryAvailable: selectAvailableTime(state),
  }
}

const mapDispatchToProps = (dispatch: any): GeolocationDispatchProps => {
  return {
    setDefaultCity: (city: City) => dispatch(setDefaultCity(city)),
    checkTime: () => dispatch(checkTime()),
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withGeolocation
)
