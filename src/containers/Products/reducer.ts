import {fromJS} from "immutable"

import {ActionType} from "./constants"
import {Status, categoriesData} from "../../constants"
import {Category} from "./actions"
import {AnyAction} from "redux"

const initialState = fromJS({
  categories: categoriesData,
})

const menuReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.SET_PRODUCTS: {
      const categories = state.get("categories").toJS()
      const injectingCategoryPos = categories
        .map((x: Category) => x.id)
        .indexOf(action.payload.category.id)
      categories[injectingCategoryPos].products = action.payload.products
      return state.set("categories", fromJS(categories))
    }
    case ActionType.CLEAR_PRODUCTS: {
      return fromJS(initialState)
    }
    case ActionType.SET_PRODUCTS_STATUS: {
      const categories = state.get("categories").toJS()
      const injectingCategoryPos = categories
        .map((x: Category) => x.id)
        .indexOf(action.payload.category.id)
      categories[injectingCategoryPos].isLoading = action.payload.isLoading
      return state.set("categories", fromJS(categories))
    }
    case ActionType.SET_ERROR: {
      const categories = state.get("categories").toJS()
      // FIXME: action.payload.category is undefined, since an error occured
      // const injectingCategoryPos = categories
      //   .map((x: Category) => x.id)
      //   .indexOf(action.payload.category.id)
      // categories[injectingCategoryPos].error = action.payload.error
      return state.set("categories", fromJS(categories))
    }
    default:
      return state
  }
}

export default menuReducer
