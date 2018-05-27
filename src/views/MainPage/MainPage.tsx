import * as React from "react"
import {Col} from "reactstrap"
import {match} from "react-router"

import symbol from "./logo_meteor.png"
import {Status} from "../../constants"
import PromotionBanner from "../../containers/PromotionBanner"
import MeteorBanner from "../../containers/MeteorBanner"
import Menu from "../../containers/Menu"

interface MainPageProps {
  match: match<{inviterToken?: string}>
}

const MainPage: React.StatelessComponent<MainPageProps> = props => (
  <>
    <div className="row">
      <Col>
        <PromotionBanner />
      </Col>
      <Col sm="auto">
        <MeteorBanner />
      </Col>
    </div>
    <Menu inviterToken={props.match ? props.match.params.inviterToken : null} />
  </>
)

export default MainPage
