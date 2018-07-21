import {parseNumber} from "libphonenumber-js"

export const validatePhone = (value: string) => {
  if (!value) {
    return "Обязательно"
  } else if (!parseNumber(value).country) {
    return "Неправильный формат"
  } else {
    return undefined
  }
}

export const validatePassword = (value: string) => {
  if (!value) {
    return "Обязательно"
  } else if (value.length < 8) {
    return "Как минимум 8 символов"
  } else {
    return undefined
  }
}

export const validatePasswordConfirmation = (
  value1: string,
  value2: string
) => {
  if (!value1) {
    return "Обязательно"
  } else if (value1 !== value2) {
    return "Не совпадает с паролем"
  } else {
    return undefined
  }
}

export const validateCode = (value: string) => {
  if (!value) {
    return "Обязательно"
  } else if (value.length !== 6) {
    return "Должно быть 6 символов"
  } else {
    return undefined
  }
}

export const validatePresence = (value: string) => {
  if (!value) {
    return "Обязательно"
  } else {
    return undefined
  }
}

export const validateIsUserPhone = (value1: string, value2: string) => {
  if (value1 !== value2) {
    return "Бонусные баллы будут начислены владельцу телефона"
  } else {
    return undefined
  }
}
