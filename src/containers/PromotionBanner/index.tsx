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

interface PromotionProps {
  banners: any[]
  bannersStatus: Status
  getBanners(): void
}

const WithPromotions = (WrappedComponent: React.ComponentType) => {
  return class WithPromotionsContainer extends React.Component<PromotionProps> {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

const mapStateToProps = (state: State) => {
  return {
    banners: selectBanners(state),
    bannersStatus: selectBannersStatus(state),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getBanners: () => dispatch(getBanners()),
  }
}

const withReducer = injectReducer({key: "promotionBanner", reducer})

export default compose(
  withReducer,
  connect(mapStateToProps, mapDispatchToProps),
  WithPromotions
)
