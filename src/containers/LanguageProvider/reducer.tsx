/*
 *
 * LanguageProvider reducer
 *
 */

import {fromJS} from "immutable"

import {CHANGE_LOCALE} from "./constants"
import {DEFAULT_LOCALE} from "./constants" // eslint-disable-line

const initialState = fromJS({
  locale: DEFAULT_LOCALE,
})

function languageProviderReducer(state = initialState, action: any) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return state.set("locale", action.locale)
    default:
      return state
  }
}

export default languageProviderReducer
