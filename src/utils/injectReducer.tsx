import * as PropTypes from "prop-types"
import * as React from "react"
import {Reducer} from "redux"
import getInjectors from "./reducerInjectors"
import hoistNonReactStatics from "hoist-non-react-statics"
import {Subtract} from "utility-types"

// Dynamically injects a reducer
export default ({key, reducer}: {key: string; reducer: Reducer<any>}) => (
  WrappedComponent: React.ComponentType
) => {
  class ReducerInjector extends React.Component {
    public static WrappedComponent = WrappedComponent

    public static contextTypes = {
      store: PropTypes.object.isRequired,
    }

    public static displayName = `withReducer(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      "Component"})`

    public injectors = getInjectors(this.context.store)

    public componentWillMount() {
      const {injectReducer} = this.injectors
      injectReducer(key, reducer)
    }

    public render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent)
}
