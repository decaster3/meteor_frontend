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

interface PromotionBannerProps {
  banners: any[]
  bannersStatus: string
  getBanners(): void
}

export class PromotionBanner extends React.Component<PromotionBannerProps> {
  componentDidMount() {
    this.props.getBanners()
  }

  render() {
    return (
      <PromotionBannerView
        banners={this.props.banners}
        bannersStatus={this.props.bannersStatus}
      />
    )
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

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({key: "promotionBanner", reducer})

export default compose(withReducer, withConnect)(PromotionBanner)
