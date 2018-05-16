/**
 *
 * User
 *
 */
import * as React from "react"
import {connect} from "react-redux"
import {compose, Dispatch} from "redux"
import {State} from "../../"
import injectReducer from "../../utils/injectReducer"
import Header from "../../components/Layout/Header"
import AppWrapper from "../../components/Layout/AppWrapper"
import Footer from "../../components/Layout/Footer"
import reducer from "./reducer"
import {
  selectUserState,
  selectCitiesState,
  selectCategoriesState,
  selectCities,
  selectCategories,
  selectUserInformation,
} from "./selectors"
import {setCities, setCategories, City, Category} from "./actions"
import {User} from "../UserSession/actions"

interface LayoutProps {
  children: any
  setCities: () => void
  setCategories: () => void
  userState: string
  citiesState: string
  categoriesState: string
  cities: City[]
  categories: Category[]
  userInformation: User
}

export class Layout extends React.Component<LayoutProps> {
  componentDidMount() {
    this.props.setCities()
    this.props.setCategories()
  }
  render() {
    return (
      <AppWrapper>
        <Header
          cities={this.props.cities}
          citiesState={this.props.citiesState}
          userInformation={this.props.userInformation}
          userState={this.props.userState}
        />
        {this.props.children}
        <Footer
          categories={this.props.categories}
          categoriesState={this.props.categoriesState}
        />
      </AppWrapper>
    )
  }
}

function mapStateToProps(state: State) {
  return {
    userState: selectUserState(state),
    citiesState: selectCitiesState(state),
    categoriesState: selectCategoriesState(state),
    cities: selectCities(state),
    categories: selectCategories(state),
    userInformation: selectUserInformation(state),
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    setCities: () => dispatch(setCities()),
    setCategories: () => dispatch(setCategories()),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({key: "layout", reducer})

export default compose(withReducer, withConnect)(Layout)
