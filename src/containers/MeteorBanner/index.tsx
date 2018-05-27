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

const mapStateToProps = (state: State): MeteorBannerProps => ({
  userState: selectUserState(state),
  userInfo: selectUserInfo(state),
})

// // Container 1

// interface Props1 {
//   userState: string
// }

// const mapStateToProps1 = (state: State): Props1 => ({
//   userState: selectUserState(state),
// })

// const withUserState = (WrappedComponent: React.ComponentType<Props>) =>
//   connect(mapStateToProps1)(WrappedComponent)

// // Container 2

// interface Props2 {
//   userInfo: User
// }

// const mapStateToProps2 = (state: State): Props2 => ({
//   userInfo: selectUserInfo(state),
// })

// const withUserInfo = (WrappedComponent: React.ComponentType<Props>) =>
//   connect(mapStateToProps)(WrappedComponent)

// interface Props {
//   userInfo: User
//   userState: string
// }

// // View

// const Menu = (props: Props1 & Props2) => <div>{props.userState} dwedewdw</div>

// export default compose(withUserInfo, withUserState)(Menu)

export default connect(mapStateToProps)(MeteorBanner)
