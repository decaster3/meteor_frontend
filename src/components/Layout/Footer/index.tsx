import * as cn from "classnames"
import * as React from "react"
import Icon from "react-fa"

// @ts-ignore
import * as styles from "./Footer.module.scss"
import {Category} from "../../../containers/Layout/actions"
const secondaryPages = [
  "Feedback",
  "Sales & Offers",
  "Delivery & Payment",
  "About",
]

const categories = [
  "Pizza",
  "Sushi",
  "Burgers",
  "Salads",
  "Beverages",
  "Desserts",
]

const Main = (props: {categoriesState: string; categories: Category[]}) => {
  return (
    <div className={cn(styles.footer, "row py-4 d-flex align-items-center")}>
      <div className={styles.menu}>
        {props.categories.map(
          (category, index) =>
            index < categories.length / 2 && (
              <div key={index}>
                <a href="#">{category.name}</a>
              </div>
            )
        )}
      </div>

      <div className={styles.footerSeparator} />

      <div className={styles.menu}>
        {props.categories.map(
          (category, index) =>
            index >= categories.length / 2 && (
              <div key={index}>
                <a href="#">{category.name}</a>
              </div>
            )
        )}
      </div>

      <div className={styles.footerSeparator} />

      <div className={styles.secondaryMenu}>
        {secondaryPages.map((secondaryPage, index) => (
          <div key={index}>
            <a href="#">{secondaryPage}</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Main
