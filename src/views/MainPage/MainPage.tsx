import * as React from "react"
import {Col} from "reactstrap"
import {match} from "react-router"

import symbol from "./logo_meteor.png"
import {Status} from "../../constants"
import PromotionBanner from "../PromotionBanner"
import MeteorBanner from "../MeteorBanner"
import Menu from "../Menu"
import {compose} from "redux"
import {withInviterToken} from "../../containers/Menu"

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
          <Col xs={12} md="auto">
            <MeteorBanner />
          </Col>
        </div>
        <Menu />
      </>
    )
  }
}

export default compose(withInviterToken)(MainPage)
