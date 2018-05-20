/*
 * User reducer
 */

import {fromJS} from "immutable"

import {ActionType} from "./constants"
import {Status} from "../../constants"
import {Category} from "./actions"
import {AnyAction} from "redux"

const initialState = fromJS({
  categories: [],
  categoriesStatus: Status.NOT_LOADED,
})

const menuReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.SET_CATEGORIES:
      return state.set("categories", fromJS(action.payload))
    case ActionType.SET_CATEGORIES_STATUS:
      return state.set("categoriesStatus", fromJS(action.payload))
    case ActionType.SET_PRODUCTS: {
      const categories = state.get("categories").toJS()

      const injectingCategoryPos = categories
        .map((x: Category) => x.id)
        .indexOf(action.payload.category.id)

      categories[injectingCategoryPos].products = action.payload.products
      return state.set("categories", fromJS(categories))
    }
    case ActionType.SET_PRODUCTS_STATUS: {
      const categories = state.get("categories").toJS()

      const injectingCategoryPos = categories
        .map((x: Category) => x.id)
        .indexOf(action.payload.category.id)

      categories[injectingCategoryPos].productsStatus =
        action.payload.productsStatus
      return state.set("categories", fromJS(categories))
    }
    default:
      return state
  }
}

export default menuReducer
