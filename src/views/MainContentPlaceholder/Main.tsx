import * as cn from "classnames"
import * as React from "react"
import Icon from "react-fa"

// @ts-ignore
import * as styles from "./MainContentPlaceholder.module.scss"

const MainContentPlaceholder = () => (
  <>
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
  </>
)

export default MainContentPlaceholder
