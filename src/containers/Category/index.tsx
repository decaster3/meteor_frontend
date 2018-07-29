import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import injectReducer from "../../utils/injectReducer"
import {getCategories} from "./actions"
import reducer from "./reducer"
import {selectCategories, selectCategoriesStatus} from "./selectors"
import {Category} from "../Products/actions"
import hoistNonReactStatics from "../../../node_modules/hoist-non-react-statics"

interface CategoriesStateProps {
  categories: Category[]
  categoriesStatus: string
}

interface CategoriesDispatchProps {
  getCategories(): void
}

export interface CategoriesProps
  extends CategoriesStateProps,
    CategoriesDispatchProps {}

const withCategories = (WrappedComponent: React.ComponentType<any>) => {
  class WithCategoriesContainer extends React.Component<any> {
    componentDidMount() {
      this.props.getCategories()
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
  return hoistNonReactStatics(WithCategoriesContainer, WrappedComponent)
}

const mapStateToCategoriesProps = (state: any): CategoriesStateProps => ({
  categories: selectCategories(state),
  categoriesStatus: selectCategoriesStatus(state),
})

const mapDispatchToCategoriesProps = (
  dispatch: any
): CategoriesDispatchProps => {
  return {
    getCategories: () => dispatch(getCategories()),
  }
}

const withReducer = injectReducer({key: "categories", reducer})

export default compose(
  withReducer,
  connect(
    mapStateToCategoriesProps,
    mapDispatchToCategoriesProps
  ),
  withCategories
)
