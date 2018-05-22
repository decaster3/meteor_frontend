import * as React from "react"
import Icon from "react-fa"
import * as _ from "lodash"

// @ts-ignore
import * as styles from "./index.module.scss"
import ProductCard from "./ProductCard"

const MainContentPlaceholder = () => (
  <>
    <div className="row">
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

    {/* <div className="row my-3">
      <div className="col">
        <div className={styles.banner} style={{height: "20rem"}}>
          How It Works
        </div>
      </div>
    </div> */}

    <div className="row mt-3 mb-5 px-3">
      {_.range(4).map(index => <ProductCard key={index} />)}
    </div>
  </>
)

export default MainContentPlaceholder
