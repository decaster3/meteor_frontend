/**
 *
 * VacanciesSearch
 *
 */
import * as React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
// import {createSelector} from "reselect"
import injectReducer from "../../utils/injectReducer"
import reducer from "./reducer"

export class Keywords extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  public render() {
    // @ts-ignore
    const a = this.props.selectedKeywords
    // tslint:disable-next-line:no-console
    console.log(a)
    // @ts-ignore
    return <p>{this.props.selectedKeywords}</p>
  }
}
function mapStateToProps(state: any) {
  return {
    // tslint:disable-next-line:no-shadowed-variable
    selectedKeywords: state
      .get("keywordsFilter")
      .get("userAuth")
      .get("userInformation"),
  }
}
const withConnect = connect(mapStateToProps, null)

const withReducer = injectReducer({key: "keywordsFilter", reducer})

export default compose(withReducer, withConnect)(Keywords)
