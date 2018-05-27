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
  selectUserInfoState,
} from "./selectors"
import {setCities, setCategories, City, Category} from "./actions"
import {User} from "../UserSession/actions"
import {Status} from "../../constants"
import MainContentPlaceholder from "../../views/MainContentPlaceholder"
import Menu from "../../views/MainContentPlaceholder/Menu"
import MainPage from "../../views/MainPage"
import Test from "../../containers/UserSession/"
import Cart from "../../containers/Cart"
import {Switch, Route, withRouter} from "react-router-dom"
import UserSession from "../UserSession"
import {UserState} from "../UserSession/constants"

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
        {/* <UserSession /> */}
        <Switch>
          <Route
            path="/invite/:inviterToken"
            exact={true}
            component={MainPage}
          />
          <Route path="/" exact={true} component={MainPage} />
          <Route path="/empty" />
          <Route path="/test" component={UserSession} />
          <Route path="/menu" component={Menu} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </Wrapper>
    )
  }
}

interface LayoutPropsStateProps {
  userState: UserState

  userInfo: User
  userInfoStatus: Status

  citiesStatus: Status
  cities: City[]

  categoriesStatus: Status
  categories: Category[]
}

const mapStateToProps = (state: State): LayoutPropsStateProps => ({
  userState: selectUserState(state),

  userInfo: selectUserInfo(state),
  userInfoStatus: selectUserInfoState(state),

  citiesStatus: selectCitiesState(state),
  cities: selectCities(state),

  categoriesStatus: selectCategoriesState(state),
  categories: selectCategories(state),
})

interface LayoutPropsDispatchProps {
  setCities: () => void
  setCategories: () => void
}

const mapDispatchToProps = (dispatch: any): LayoutPropsDispatchProps => ({
  setCities: () => dispatch(setCities()),
  setCategories: () => dispatch(setCategories()),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({key: "layout", reducer})

export default withRouter(compose(withReducer, withConnect)(Layout))
