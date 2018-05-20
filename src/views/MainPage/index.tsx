import * as React from "react"
import Icon from "react-fa"
import * as cn from "classnames"
import symbol from "./logo_meteor.png"
import {Status} from "../../constants"
import PromotionBanner from "../../containers/PromotionBanner"
import MeteorBanner from "../../containers/MeteorBanner"
import Menu from "../../containers/Menu"
// @ts-ignore
import * as styles from "./Menu.module.scss"

const MainPage = () => {
  return (
    <>
      <div className="row pt-3 mb-3">
        <PromotionBanner />
        <MeteorBanner />
      </div>
      <div className="row my-3">
        <Menu />
      </div>
    </>
  )
}

export default MainPage
