/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import * as React from "react"
import {connect} from "react-redux"
import {createSelector} from "reselect"
import {IntlProvider} from "react-intl"

import {makeSelectLocale} from "./selectors"

interface LanguageProviderProps {
  locale: any
  messages: any
}

export class LanguageProvider extends React.PureComponent<
  LanguageProviderProps
> {
  // eslint-disable-line react/prefer-stateless-function
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

function mapDispatchToProps(dispatch: any) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider)
