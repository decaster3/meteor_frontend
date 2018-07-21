import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {State} from "../.."
import injectReducer from "../../utils/injectReducer"
import {createProduct} from "./actions"
import reducer from "./reducer"
import {selectIsProductCreating} from "./selectors"

interface PromotionStateProps {
  isProductCreating: boolean
}

interface PromotionDispatchProps {
  createProduct(image: any, product: any): void
}

export interface PromotionProps
  extends PromotionStateProps,
    PromotionDispatchProps {}

const WithProductCreation = (WrappedComponent: React.ComponentType) => {
  return class WithProductCreationContainer extends React.Component<
    PromotionProps
  > {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

const mapStateToProps = (state: State): PromotionStateProps => {
  return {
    isProductCreating: selectIsProductCreating(state),
  }
}

const mapDispatchToProps = (dispatch: any): PromotionDispatchProps => {
  return {
    createProduct: (image: any, product: any) =>
      dispatch(createProduct(image, product)),
  }
}

const withReducer = injectReducer({key: "productCreation", reducer})

export default compose(
  withReducer,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  WithProductCreation
)
