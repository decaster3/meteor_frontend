import {createSelector} from "reselect"

const selectUserDomain = (state: any) => state.get("userSession")
const selectLayoutDomain = (state: any) => state.get("layout")

export const selectUserState = createSelector(selectUserDomain, userState =>
  userState.get("userState")
)
export const selectUserInfo = createSelector(selectUserDomain, userState =>
  userState.get("userInfo")
)
export const selectCitiesState = createSelector(
  selectLayoutDomain,
  citiesState => citiesState.get("citiesState")
)
export const selectCategoriesState = createSelector(
  selectLayoutDomain,
  categoriesState => categoriesState.get("categoriesState")
)
export const selectCities = createSelector(selectLayoutDomain, cities =>
  cities.get("cities").toJS()
)
export const selectCategories = createSelector(selectLayoutDomain, categories =>
  categories.get("categories").toJS()
)
