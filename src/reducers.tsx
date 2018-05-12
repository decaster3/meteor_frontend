/**
 * Combine all reducers in this file and export the combined reducers.
 */

import {fromJS} from "immutable"
import {combineReducers} from "redux-immutable"
import languageProviderReducer from "./containers/LanguageProvider/reducer"

// tslint:disable-next-line:no-var-requires
const {LOCATION_CHANGE} = require("react-router-redux")

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
})

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action: any) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      })
    default:
      return state
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers: any) {
  return combineReducers({
    language: languageProviderReducer,
    route: routeReducer,
    ...injectedReducers,
  })
}
