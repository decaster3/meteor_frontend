import * as classnames from "classnames"
import * as React from "react"
import Icon from "react-fa"

// @ts-ignore
import * as styles from "./Footer.module.scss"
import {Category} from "../../containers/App/actions"
import {Status} from "../../constants"

const secondaryPages = [
  "Feedback",
  "Sales & Offers",
  "Delivery & Payment",
  "About",
]

const Footer = (props: {categoriesStatus: Status; categories: Category[]}) => (
  <>
    <div className={classnames(styles.bottomNavbar, "row")}>
      {props.categories.map((category, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className={styles.bottomNavbarSeparator} />}
          <div>
            <a href="#">{category.name}</a>
          </div>
        </React.Fragment>
      ))}
    </div>
    <div
      className={classnames(
        styles.footer,
        "row py-4 d-flex align-items-center"
      )}
    >
      <div className={styles.secondaryMenu}>
        {secondaryPages.map((secondaryPage, index) => (
          <div key={index}>
            <a href="#">{secondaryPage}</a>
          </div>
        ))}
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
  </>
)

export default Footer
