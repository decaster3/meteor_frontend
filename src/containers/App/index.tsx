/*
 * User
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
import MainContentPlaceholder from "../../views/MainContentPlaceholder"
import Menu from "../../views/MainContentPlaceholder/Menu"
import Test from "../../containers/UserSession/"
import {Switch, Route} from "react-router"
import {UserSession} from "../UserSession"
import {UserStatus} from "../UserSession/constants"

export class Layout extends React.Component<
  LayoutPropsStateProps & LayoutPropsDispatchProps
> {
  componentDidMount() {
    this.props.setCities()
    this.props.setCategories()
  }
  render() {
    return (
      <Wrapper {...this.props}>
        <Switch>
          <Route path="/" exact={true} component={MainContentPlaceholder} />
          <Route path="/empty" />
          <Route path="/test" component={UserSession} />
          <Route path="/menu" component={Menu} />
        </Switch>
      </Wrapper>
    )
  }
}

interface LayoutPropsStateProps {
  user: User
  userStatus: UserStatus
  citiesStatus: Status
  categoriesStatus: Status
  cities: City[]
  categories: Category[]
  userInfo: User
}

const mapStateToProps = (state: State): LayoutPropsStateProps => {
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

const mapDispatchToProps = (dispatch: any): LayoutPropsDispatchProps => {
  return {
    setCities: () => dispatch(setCities()),
    setCategories: () => dispatch(setCategories()),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({key: "layout", reducer})

export default compose(withReducer, withConnect)(Layout)
