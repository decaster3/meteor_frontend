/*
 * User
 */
import * as React from "react"
import {connect} from "react-redux"
import {compose, Dispatch} from "redux"
import {State} from "../../"
import injectReducer from "../../utils/injectReducer"
import {login, logout} from "./actions"
import reducer from "./reducer"
import {selectUserState} from "./selectors"

interface UserSessionProps {
  userState: string
  login(params: {email: string; password: string; phone: string}): void
  logout(): void
}
export class UserSession extends React.Component<UserSessionProps> {
  handleClick = (evt: React.SyntheticEvent<HTMLButtonElement>) => {
    this.props.login({
      email: "tiran678@icloud.com",
      password: "qwerty",
      phone: "89991571024",
    })
  }
  handleClickLogout = (evt: React.SyntheticEvent<HTMLButtonElement>) => {
    this.props.logout()
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>{this.props.userState}</button>
        <button onClick={this.handleClickLogout}>logout</button>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    userState: selectUserState(state),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (ev: {email: string; password: string; phone: string}) =>
      dispatch(login(ev)),
    logout: () => dispatch(logout()),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({key: "userSession", reducer})

export default compose(withReducer, withConnect)(UserSession)
