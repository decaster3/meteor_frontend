import * as React from "react"
import {Col} from "reactstrap"
import {match} from "react-router"

import symbol from "./logo_meteor.png"
import {Status} from "../../constants"
import PromotionBanner from "../PromotionBanner"
import MeteorBanner from "../MeteorBanner"
import Menu from "../Menu"
import {compose} from "redux"
import {withRegistration} from "../../containers/UserSession"

interface MainPage {
  match: any
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
          <Col>
            <PromotionBanner />
          </Col>
          <Col sm="auto">
            <MeteorBanner />
          </Col>
        </div>
        <Menu />
      </>
    )
  }
}

export default compose(withRegistration)(MainPage)