import * as cn from "classnames"
import * as React from "react"
import Icon from "react-fa"

// @ts-ignore
import * as styles from "./Header.module.scss"
import logo from "./logo1.svg"

const pages = ["City", "Menu", "Sales", "Profile", "Cart"]

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
    </div>
  </div>
)

export default Main
