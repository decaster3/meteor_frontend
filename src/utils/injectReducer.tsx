import * as PropTypes from "prop-types"
import * as React from "react"
import {Action} from "redux"
import getInjectors from "./reducerInjectors"

// tslint:disable-next-line:no-var-requires
const hoistNonReactStatics = require("hoist-non-react-statics")

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 */
export default ({
  key,
  reducer,
}: {
  key: string
  reducer: (state: any, action: Action) => any
}) => (WrappedComponent: any) => {
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
