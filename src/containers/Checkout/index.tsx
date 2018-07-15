/*
 * User
 */
import React from "react"
import {connect} from "react-redux"
import {compose, Dispatch} from "redux"
import {State} from "../.."
import injectReducer from "../../utils/injectReducer"
import reducer from "./reducer"
import {
  selectStreets,
  selectStreetsStatus,
  selectOrderStatus,
  selectIsOrderPending,
} from "./selectors"
import {makeOrder, getStreets, Address} from "./actions"

const withCheckout = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class WithCheckoutContainer extends React.Component<
    CheckoutStateProps & CheckoutDispatchProps & P
  > {
    componentDidMount() {
      this.props.getStreets()
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

export interface CheckoutStateProps {
  streets: string[]
  streetsStatus: string
  orderStatus: string
  isOrderPending: boolean
}

export interface CheckoutDispatchProps {
  makeOrder(
    address: Address,
    name: string,
    phone: string,
    paymentMethod: string
  ): void
  getStreets(): void
}

export interface CheckoutProps
  extends CheckoutStateProps,
    CheckoutDispatchProps {}

const mapStateToProps = (state: State): CheckoutStateProps => {
  return {
    streets: selectStreets(state),
    streetsStatus: selectStreetsStatus(state),
    orderStatus: selectOrderStatus(state),
    isOrderPending: selectIsOrderPending(state),
  }
}

const mapDispatchToProps = (dispatch: any): CheckoutDispatchProps => {
  return {
    makeOrder: (
      address: Address,
      name: string,
      phone: string,
      paymentMethod: string
    ) => dispatch(makeOrder(address, name, phone, paymentMethod)),
    getStreets: () => dispatch(getStreets()),
  }
}

const withReducer = injectReducer({key: "checkout", reducer})

export default compose(
  withReducer,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withCheckout
)
