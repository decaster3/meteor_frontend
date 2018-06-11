/*
 * User
 */
import * as React from "react"
import {connect} from "react-redux"
import {compose, Dispatch} from "redux"
import {State} from "../../"
import injectReducer from "../../utils/injectReducer"
import reducer from "./reducer"
import {
  selectCitiesStatus,
  selectCities,
  selectShowModal,
  selectIsNavigationAllowed,
  selectProbableCityStatus,
  selectProbableCity,
  selectDefaultCity,
} from "./selectors"
import CartView from "../../views/Cart"
import {configureGeolocation, setDefaultCity} from "./actions"
import {City} from "./actions"

interface CartProps {
  cities: City[]
  citiesStatus: string
  defaultCity: City
  probableCity: City
  probableCityStatus: string
  isNavigationAllowed: boolean
  showModal: boolean
  configureGeolocation(): void
  setDefaultCity(city: City): void
}

const WithGeolocation = (WrappedComponent: React.ComponentType) => {
  return class WithGeolocationContainer extends React.Component<CartProps> {
    componentDidMount() {
      this.props.configureGeolocation()
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

const mapStateToProps = (state: State) => {
  return {
    citiesStatus: selectCitiesStatus(state),
    cities: selectCitiesStatus(state),
    showModal: selectShowModal(state),
    isNavigationAllowed: selectIsNavigationAllowed(state),
    probableCityStatus: selectProbableCityStatus(state),
    probableCity: selectProbableCity(state),
    defaultCity: selectDefaultCity(state),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    configureGeolocation: () => dispatch(configureGeolocation()),
    setDefaultCity: (city: City) => dispatch(setDefaultCity(city)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithGeolocation
)
