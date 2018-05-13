/*
 *
 * User reducer
 *
 */

import {fromJS} from "immutable"
// import {ANONYMOUS} from "./constants"

const initialState = fromJS({
  userAuth: {
    userInformation: 2,
  },
})

function userReducer(state = initialState, action: any) {
  switch (action.type) {
    default:
      return state
  }
}

export default userReducer
