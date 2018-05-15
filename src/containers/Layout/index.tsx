/**
 *
 * User
 *
 */
import * as React from "react"
import {connect} from "react-redux"
import {compose, Dispatch} from "redux"
import {State} from "../../"
import Header from "../../components/Layout/Header"
import AppWrapper from "../../components/Layout/AppWrapper"
import Footer from "../../components/Layout/Footer"

interface LayoutProps {
  children: any
}
export class Layout extends React.Component<LayoutProps> {
  render() {
    return (
      <AppWrapper>
        <Header />
        {this.props.children}
        <Footer />
      </AppWrapper>
    )
  }
}

function mapStateToProps(state: State) {
  return {}
}

function mapDispatchToProps(dispatch: any) {
  return {}
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Layout)
