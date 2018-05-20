/*
 * User
 */
import * as React from "react"
import {connect} from "react-redux"
import {compose, Dispatch} from "redux"
import {State} from "../../"
import injectReducer from "../../utils/injectReducer"
import {selectUserState, selectUserInfo} from "./selectors"
import MeteorBannerView from "../../views/MeteorBanner"
import {User} from "../UserSession/actions"

interface MeteorBannerProps {
  userInfo: User
  userState: string
}

export class MeteorBanner extends React.Component<MeteorBannerProps> {
  render() {
    return (
      <MeteorBannerView
        userInfo={this.props.userInfo}
        userState={this.props.userState}
      />
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    userState: selectUserState(state),
    userInfo: selectUserInfo(state),
  }
}

export default connect(mapStateToProps, null)(MeteorBanner)
