import {connect} from "react-redux"
import {compose} from "redux"
import injectReducer from "../../utils/injectReducer"
import {createProduct} from "./actions"
import reducer from "./reducer"
import {selectIsProductCreating} from "./selectors"

interface ProductCreationStateProps {
  isProductCreating: boolean
}

interface ProductCreationDispatchProps {
  createProduct(image: any, product: any): void
}

export interface ProductCreationProps
  extends ProductCreationStateProps,
    ProductCreationDispatchProps {}

const mapStateToProps = (state: any): ProductCreationStateProps => {
  return {
    isProductCreating: selectIsProductCreating(state),
  }
}

const mapDispatchToProps = (dispatch: any): ProductCreationDispatchProps => {
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
  )
)
