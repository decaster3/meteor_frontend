/*
 * LanguageProvider actions
 */

import {CHANGE_LOCALE} from "./constants"

export function changeLocale(languageLocale: string) {
  return {
    locale: languageLocale,
    type: CHANGE_LOCALE,
  }
}
