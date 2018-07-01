/*
 * User
 */
import * as React from "react"
import {connect} from "react-redux"
import {compose, Dispatch} from "redux"
import {State} from "../../"
import injectReducer from "../../utils/injectReducer"
import {createProduct} from "./actions"
import reducer from "./reducer"
import {selectIsProductCreating} from "./selectors"
import {OptionName} from "../Product/actions"

interface PromotionProps {
  isProductCreating: boolean
  createProduct(photo: any, product: any): void
}

const WithProductCreation = (WrappedComponent: React.ComponentType) => {
  return class WithProductCreationContainer extends React.Component<
    PromotionProps
  > {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

const mapStateToProps = (state: State) => {
  return {
    isProductCreating: selectIsProductCreating(state),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    createProduct: (photo: any, product: any) =>
      dispatch(createProduct(photo, product)),
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
