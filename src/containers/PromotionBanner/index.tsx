/*
 * User
 */
import * as React from "react"
import {connect} from "react-redux"
import {compose, Dispatch} from "redux"
import {State} from "../../"
import injectReducer from "../../utils/injectReducer"
import {getBanners} from "./actions"
import reducer from "./reducer"
import {selectBanners, selectBannersStatus} from "./selectors"
import PromotionBannerView from "../../views/PromotionBanner"
import {Status} from "../../constants"

interface PromotionStateProps {
  banners: any[]
  bannersStatus: Status
}

interface PromotionDispatchProps {
  getBanners(): void
}

export interface PromotionProps
  extends PromotionStateProps,
    PromotionDispatchProps {}

const mapStateToProps = (state: State): PromotionStateProps => {
  return {
    banners: selectBanners(state),
    bannersStatus: selectBannersStatus(state),
  }
}

const mapDispatchToProps = (dispatch: any): PromotionDispatchProps => {
  return {
    getBanners: () => dispatch(getBanners()),
  }
}

const withReducer = injectReducer({key: "promotionBanner", reducer})

export default compose(
  withReducer,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)
