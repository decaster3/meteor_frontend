import * as classnames from "classnames"
import * as React from "react"

// @ts-ignore
import styles from "./ProductCard.module.scss"

const ProductCard = () => (
  <div className={styles.productCard}>
    <div className={styles.imgContainer}>
      <img src="http://placekitten.com/300/200" />
    </div>
    <div className={styles.name}>Spicy Salmon</div>
    <div className={styles.ingridients}>
      Spice, Salmon, Salmon and Spice, and Stuff
    </div>
    <div className={styles.weight}>
      37 <small>g</small>
    </div>
    <div className={styles.price}>
      150 <small>KZT</small>
    </div>
    <button className={styles.order}>Order</button>
  </div>
)

export default ProductCard
