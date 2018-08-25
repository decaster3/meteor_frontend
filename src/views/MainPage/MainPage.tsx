import React from "react"

import PromotionBanner from "../Promotions/PromotionBanner"
import MeteorBanner from "../MeteorBanner"
import Menu from "../Menu"
import {compose} from "redux"
import {withRegistration} from "../../containers/UserSession"
import {match, withRouter} from "react-router"

interface MainPage {
  match: match<{inviterToken?: string}>
  setInviterToken(inviterToken: string): void
}

class MainPage extends React.Component<MainPage> {
  componentDidMount() {
    if (this.props.match && this.props.match.params.inviterToken) {
      this.props.setInviterToken(this.props.match.params.inviterToken)
    }
  }
  render() {
    return (
      <>
        <div className="row">
          <div className="col">
            <PromotionBanner />
          </div>
          <div className="col-12 col-md-auto">
            <MeteorBanner />
          </div>
        </div>
        <Menu />
      </>
    )
  }
}

export default compose(
  withRouter,
  withRegistration
)(MainPage)
