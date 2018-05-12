/*
 * LanguageProvider actions
 */

import {CHANGE_LOCALE} from "./constants"

export const changeLocale = (languageLocale: string) => ({
  locale: languageLocale,
  type: CHANGE_LOCALE,
})
