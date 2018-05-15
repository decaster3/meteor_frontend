import * as cn from "classnames"
import * as React from "react"
import Icon from "react-fa"

// @ts-ignore
import * as styles from "./Main.module.scss"
import logo from "./logo1.svg"

const pages = ["City", "Menu", "Sales", "Profile", "Cart"]

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

const Main = () => (
  <div className={styles.wrapper}>
    <div className={styles.backdrop}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-3">
            <div className={styles.logo}>
              <img src={logo} />
            </div>
          </div>

          <div className="col-2">
            <div className={styles.call}>
              <div>+7 727 321-22-21</div>
              <button>
                <Icon name="phone" /> Call
              </button>
            </div>
          </div>

          <div className={cn(styles.topNavbar, "col")}>
            {pages.map((page, index) => (
              <React.Fragment key={index}>
                {index > 0 && <div className={styles.topNavbarSeparator} />}
                <div>
                  <a href="#">{page}</a>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className={cn("container", styles.container)}>
        <div className="row pt-3 mb-3">
          <div className="col-4">
            <div className={styles.banner} style={{height: "20rem"}}>
              Ad Banner
            </div>
          </div>
          <div className="col-8">
            <div className={styles.banner} style={{height: "20rem"}}>
              Image
            </div>
          </div>
        </div>

        <div className="row my-3">
          <div className="col">
            <div className={styles.banner} style={{height: "20rem"}}>
              How It Works
            </div>
          </div>
        </div>

        <div className={cn(styles.bottomNavbar, "row")}>
          {categories.map((category, index) => (
            <React.Fragment key={index}>
              {index > 0 && <div className={styles.bottomNavbarSeparator} />}
              <div>
                <a href="#">{category}</a>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div
          className={cn(styles.footer, "row py-4 d-flex align-items-center")}
        >
          <div className={styles.menu}>
            {categories.map(
              (category, index) =>
                index < categories.length / 2 && (
                  <div key={index}>
                    <a href="#">{category}</a>
                  </div>
                )
            )}
          </div>

          <div className={styles.footerSeparator} />

          <div className={styles.menu}>
            {categories.map(
              (category, index) =>
                index >= categories.length / 2 && (
                  <div key={index}>
                    <a href="#">{category}</a>
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
      </div>
    </div>
  </div>
)

export default Main
