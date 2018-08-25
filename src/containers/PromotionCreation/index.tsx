import {connect} from "react-redux"
import {compose} from "redux"
import injectReducer from "../../utils/injectReducer"
import {createPromotion} from "./actions"
import reducer from "./reducer"
import {selectIsPromotionCreating} from "./selectors"

interface PromotionCreationStateProps {
  isPromotionCreating: boolean
}

interface PromotionCreationDispatchProps {
  createPromotion(image: any, description: string): void
}

export interface PromotionCreationProps
  extends PromotionCreationStateProps,
    PromotionCreationDispatchProps {}

const mapStateToProps = (state: any): PromotionCreationStateProps => {
  return {
    isPromotionCreating: selectIsPromotionCreating(state),
  }
}

const mapDispatchToProps = (dispatch: any): PromotionCreationDispatchProps => {
  return {
    createPromotion: (image: any, description: string) =>
      dispatch(createPromotion(image, description)),
  }
}

const withReducer = injectReducer({key: "promotionCreation", reducer})

export default compose(
  withReducer,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)
