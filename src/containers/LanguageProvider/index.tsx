/*
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from "react"
import {IntlProvider} from "react-intl"
import {connect} from "react-redux"
import {createSelector} from "reselect"
import {makeSelectLocale} from "./selectors"

interface ILanguageProviderProps {
  locale: any
  messages: any[]
}

export class LanguageProvider extends React.PureComponent<
  ILanguageProviderProps
> {
  render() {
    return (
      <IntlProvider
        locale={this.props.locale}
        key={this.props.locale}
        messages={this.props.messages[this.props.locale]}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    )
  }
}

const mapStateToProps = createSelector(makeSelectLocale(), (locale: any) => ({
  locale,
}))

const mapDispatchToProps = (dispatch: any) => ({
  dispatch,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageProvider)
