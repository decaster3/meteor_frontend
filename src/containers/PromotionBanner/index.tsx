import {connect} from "react-redux"
import {compose} from "redux"
import injectReducer from "../../utils/injectReducer"
import {getPromotions, Promotion} from "./actions"
import reducer from "./reducer"
import {selectPromotions, selectPromotionsStatus} from "./selectors"
import {Status} from "../../constants"
import React from "react"

export interface PromotionStateProps {
  promotions: Promotion[]
  promotionsStatus: Status
}

interface PromotionDispatchProps {
  getPromotions(): void
}

export interface PromotionProps
  extends PromotionStateProps,
    PromotionDispatchProps {}

const withPromotions = (WrappedComponent: React.ComponentType<any>) => {
  return class WithCategoriesContainer extends React.Component<any> {
    componentDidMount() {
      this.props.getPromotions()
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

const mapStateToProps = (state: any): PromotionStateProps => {
  return {
    promotions: selectPromotions(state),
    promotionsStatus: selectPromotionsStatus(state),
  }
}

const mapDispatchToProps = (dispatch: any): PromotionDispatchProps => {
  return {
    getPromotions: () => dispatch(getPromotions()),
  }
}

const withReducer = injectReducer({key: "promotionBanner", reducer})

export default compose(
  withReducer,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withPromotions
)
