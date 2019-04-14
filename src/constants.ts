import moment from "moment"
import pizza from "./assets/pizza.png"
import burger from "./assets/burger.png"
import sushi from "./assets/sushi.png"
import snacks from "./assets/snacks.png"

import {Category} from "./containers/Products/actions"

export const API_URL = `${process.env.REACT_APP_BASE_URL || ""}/api`
export const JS_HREF = "javascript:void(0);"

export enum Status {
  NOT_LOADED = "NOT_LOADED",
  LOADED = "LOADED",
  LOADING = "LOADING",
  LOADING_ERROR = "LOADING_ERROR",
}

export const categoriesData: Category[] = [
  {
    id: 1,
    name: "Пицца",
    key: "pizza",
    isLoading: false,
    products: null,
    error: null,
    subcategories: [{name: "Вегатрианские", id: 1}, {name: "Мясные", id: 2}],
    imgUrl: pizza,
    optionNames: [
      {
        id: 1,
        isCharacteristic: false,
        name: "размер",
      },
      {
        id: 2,
        isCharacteristic: false,
        name: "тесто",
      },
      {
        id: 3,
        isCharacteristic: true,
        name: "вес",
      },
    ],
  },
  {
    id: 2,
    name: "Бургеры",
    imgUrl: burger,
    key: "burgers",
    isLoading: false,
    products: null,
    error: null,
    subcategories: [{name: "Вегатрианские", id: 1}, {name: "Мясные", id: 2}],
    optionNames: [
      {
        id: 3,
        isCharacteristic: true,
        name: "вес",
      },
    ],
  },
  {
    id: 3,
    name: "Суши",
    imgUrl: sushi,
    key: "sushi",
    isLoading: false,
    products: null,
    error: null,
    subcategories: [{name: "Вегатрианские", id: 1}, {name: "Мясные", id: 2}],
    optionNames: [
      {
        id: 3,
        isCharacteristic: true,
        name: "количество",
      },
    ],
  },
  {
    id: 4,
    name: "Закуски",
    imgUrl: snacks,
    key: "snacks",
    isLoading: false,
    products: null,
    error: null,
    subcategories: [{name: "Вегатрианские", id: 1}, {name: "Мясные", id: 2}],
    optionNames: [
      {
        id: 3,
        isCharacteristic: true,
        name: "вес",
      },
    ],
  },
  {
    id: 5,
    name: "Сэты",
    imgUrl: snacks,
    key: "sets",
    isLoading: false,
    products: null,
    error: null,
    subcategories: [{name: "Вегатрианские", id: 1}, {name: "Мясные", id: 2}],
    optionNames: [
      {
        id: 3,
        isCharacteristic: true,
        name: "количество",
      },
    ],
  },
  {
    id: 6,
    name: "Напитки",
    imgUrl: snacks,
    key: "drinks",
    isLoading: false,
    products: null,
    error: null,
    subcategories: [{name: "Вегатрианские", id: 1}, {name: "Мясные", id: 2}],
    optionNames: [
      {
        id: 3,
        isCharacteristic: true,
        name: "количество",
      },
    ],
  },
]

export const citiesData = [
  {
    id: 1,
    name: "Алматы",
    phone: "+7 987 043 21 12",
    currency: "тенге",
    googleKey: "Almaty",
    minimalOrderPrice: 3000,
    registrationBonus: 200,
    inviteBonus: 150,
    schedule: [
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
    ],
  },
  {
    id: 2,
    name: "Бишкек",
    phone: "+7 987 043 21 12",
    currency: "сом",
    googleKey: "Bishkek",
    minimalOrderPrice: 3000,
    registrationBonus: 300,
    inviteBonus: 100,
    schedule: [
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
    ],
  },
  {
    id: 3,
    name: "Астана",
    phone: "+7 987 043 21 12",
    currency: "тенге",
    googleKey: "Astana",
    minimalOrderPrice: 3000,
    registrationBonus: 400,
    inviteBonus: 200,
    schedule: [
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("14:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("15:00", "HH:mm"),
      },
      {
        opensAt: moment("07:00", "HH:mm"),
        closesAt: moment("14:00", "HH:mm"),
      },
    ],
  },
]
