import {connect} from "react-redux"
import {compose} from "redux"
import injectReducer from "../../utils/injectReducer"
import {getPromotions, Promotion} from "./actions"
import reducer from "./reducer"
import {
  selectPromotions,
  selectPromotionsStatus,
  selectPromotionsError,
} from "./selectors"
import {Status} from "../../constants"
import React, {ComponentType, Component} from "react"

interface PromotionStateProps {
  promotions: Promotion[]
  isLoading: Status
  error: Error | null
}

interface PromotionDispatchProps {
  getPromotions(): void
}

export interface PromotionProps
  extends PromotionStateProps,
    PromotionDispatchProps {}

const withPromotions = <P extends PromotionProps>(
  WrappedComponent: ComponentType<P>
) => {
  return class WithPromotionsContainer extends Component<P> {
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
    error: selectPromotionsError(state),
    isLoading: selectPromotionsStatus(state),
  }
}

const mapDispatchToProps = (dispatch: any): PromotionDispatchProps => {
  return {
    getPromotions: () => dispatch(getPromotions()),
  }
}

const withReducer = injectReducer({key: "promotions", reducer})

export default compose(
  withReducer,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withPromotions
)
