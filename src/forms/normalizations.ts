import {formatNumber} from "libphonenumber-js"

export const normalizePhone = (value: string) => {
  if (!value) {
    return value
  } else {
    return formatNumber(value, "International")
  }
}
