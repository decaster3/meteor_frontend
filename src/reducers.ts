/**
 * Combine all reducers in this file and export the combined reducers.
 */

import {reducer as formReducer} from "redux-form/immutable"
import {combineReducers} from "redux-immutable"
import cartReducer from "./containers/Cart/reducer"
import geolocationReducer from "./containers/Geolocation/reducer"
import userSessionReducer from "./containers/UserSession/reducer"

/**
 * Creates the main reducer with the dynamically injected ones
 */
const createReducer = (injectedReducers: any) => {
  // tslint:disable-next-line:no-console
  return combineReducers({
    userSession: userSessionReducer,
    cart: cartReducer,
    form: formReducer,
    geolocation: geolocationReducer,
    ...injectedReducers,
  })
}
export default createReducer
