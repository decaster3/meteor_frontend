import * as React from "react"
import Icon from "react-fa"

import * as styles from "./Footer.module.scss"
import {Category} from "../../containers/App/actions"
import {Status} from "../../constants"
import {Row} from "reactstrap"

const secondaryPages = [
  "Feedback",
  "Sales & Offers",
  "Delivery & Payment",
  "About",
]

interface FooterProps {
  categoriesStatus: Status
  categories: Category[]
}

const Footer: React.StatelessComponent<FooterProps> = props => (
  <>
    <Row className={styles.bottomNavbar}>
      {props.categories.map((category, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className={styles.bottomNavbarSeparator} />}
          <div>
            <a href="#">{category.name}</a>
          </div>
        </React.Fragment>
      ))}
    </Row>

    <div className={styles.footer}>
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
