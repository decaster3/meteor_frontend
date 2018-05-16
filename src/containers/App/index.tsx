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
import Header from "../../views/Header"
import Wrapper from "../../views/Wrapper"
import Footer from "../../views/Footer"
import reducer from "./reducer"
import {
  selectUserState,
  selectCitiesState,
  selectCategoriesState,
  selectCities,
  selectCategories,
  selectUserInfo,
} from "./selectors"
import {setCities, setCategories, City, Category} from "./actions"
import {User} from "../UserSession/actions"
import {Status} from "../../constants"

export class Layout extends React.Component<
  LayoutPropsStateProps & LayoutPropsDispatchProps
> {
  componentDidMount() {
    this.props.setCities()
    this.props.setCategories()
  }
  render() {
    return (
      <Wrapper
        cities={this.props.cities}
        citiesStatus={this.props.citiesStatus}
        user={this.props.user}
        userStatus={this.props.userStatus}
        categories={this.props.categories}
        categoriesStatus={this.props.categoriesStatus}
      >
        {this.props.children}
      </Wrapper>
    )
  }
}

interface LayoutPropsStateProps {
  user: User
  userStatus: Status
  citiesStatus: Status
  categoriesStatus: Status
  cities: City[]
  categories: Category[]
  userInfo: User
}

function mapStateToProps(state: State): LayoutPropsStateProps {
  return {
    user: selectUserState(state),
    userStatus: selectUserInfo(state),
    citiesStatus: selectCitiesState(state),
    categoriesStatus: selectCategoriesState(state),
    cities: selectCities(state),
    categories: selectCategories(state),
    userInfo: selectUserInfo(state),
  }
}

interface LayoutPropsDispatchProps {
  setCities: () => void
  setCategories: () => void
}

function mapDispatchToProps(dispatch: any): LayoutPropsDispatchProps {
  return {
    setCities: () => dispatch(setCities()),
    setCategories: () => dispatch(setCategories()),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({key: "layout", reducer})

export default compose(withReducer, withConnect)(Layout)
