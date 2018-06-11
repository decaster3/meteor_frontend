import {formatNumber, parseNumber} from "libphonenumber-js"

export const validatePhone = (value: string) => {
  if (!value) {
    return "Обязательно"
  } else {
    if (!parseNumber(value).country) {
      return "Непавильный формат"
    }
  }
  return undefined
}

export const normalizePhone = (value: string) => {
  if (!value) {
    return value
  } else {
    return formatNumber(value, "International")
  }
}

export const passwordValidation = (value: string) => {
  if (!value) {
    return "Обязательно"
  } else {
    if (value.length < 8) {
      return "Как минимум 8 символов"
    }
  }
  return undefined
}

export const passwordConfirmationValidation = (
  value1: string,
  value2: string
) => {
  if (!value1) {
    return "Обязательно"
  } else {
    if (value1 !== value2) {
      return "Не совпадает с паролем"
    }
  }
  return undefined
}

export const codeValidation = (value: string) => {
  if (!value) {
    return "Обязательно"
  } else {
    if (value.length !== 6) {
      return "Должно быть 6 символов"
    }
  }
  return undefined
}

export const validatePresence = (value: string) => {
  if (!value) {
    return "Обязательно"
  }
  return undefined
}

export const validateIsUserPhone = (value1: string, value2: string) => {
  console.log(value1, value2)
  if (value1 !== value2) {
    console.log(value1, value2)
    return "Бонусные баллы будут начислены владельцу телефона"
  }
  return undefined
}
