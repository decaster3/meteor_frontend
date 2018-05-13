import {createSelector} from "reselect"

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = (state: any) => state.get("language")

/**
 * Select the language locale
 */

const makeSelectLocale = () =>
  createSelector(selectLanguage, (languageState: any) =>
    languageState.get("locale")
  )

export {selectLanguage, makeSelectLocale}
