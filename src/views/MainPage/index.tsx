import * as React from "react"

import symbol from "./logo_meteor.png"
import {Status} from "../../constants"
import PromotionBanner from "../../containers/PromotionBanner"
import MeteorBanner from "../../containers/MeteorBanner"
import Menu from "../../containers/Menu"
import {Col} from "reactstrap"

const MainPage = () => (
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

export default MainPage
