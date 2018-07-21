export const BASEURL = "http://0.0.0.0:3001"
import pizza from "./assets/pizza.png"
import burger from "./assets/burger.png"
import sushi from "./assets/sushi.png"
import snacks from "./assets/snacks.png"

export const JS_HREF = "javascript:void(0);"

export enum Status {
  NOT_LOADED = "NOT_LOADED",
  LOADED = "LOADED",
  LOADING = "LOADING",
  LOADING_ERROR = "LOADING_ERROR",
}

export const categoriesData = [
  {
    id: 1,
    name: "Пицца",
    url: "/pizza",
    productsStatus: Status.NOT_LOADED,
    products: [],
    subcategories: [{name: "Веганские", id: 1}, {name: "Мясные", id: 2}],
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
    url: "/burgers",
    productsStatus: Status.NOT_LOADED,
    products: [],
    subcategories: [{name: "Веганские", id: 1}, {name: "Мясные", id: 2}],
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
    url: "/sushi",
    productsStatus: Status.NOT_LOADED,
    products: [],
    subcategories: [{name: "Веганские", id: 1}, {name: "Мясные", id: 2}],
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
    url: "/snacks",
    productsStatus: Status.NOT_LOADED,
    products: [],
    subcategories: [{name: "Веганские", id: 1}, {name: "Мясные", id: 2}],
    optionNames: [
      {
        id: 3,
        isCharacteristic: true,
        name: "вес",
      },
    ],
  },
]
