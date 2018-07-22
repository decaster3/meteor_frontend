import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import injectReducer from "../../utils/injectReducer"
import {getCategories} from "./actions"
import reducer from "./reducer"
import {selectCategories, selectCategoriesStatus} from "./selectors"
import {Category} from "../Products/actions"

interface CategoriesStateProps {
  categories: Category[]
  categoriesStatus: string
  inviterToken?: string
}

interface CategoriesDispatchProps {
  getCategories(): void
}

export interface CategoriesProps
  extends CategoriesStateProps,
    CategoriesDispatchProps {}

const withCategories = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class WithCategoriesContainer extends React.Component<
    CategoriesProps & P
  > {
    componentDidMount() {
      this.props.getCategories()
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
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
