import * as cn from "classnames"
import * as React from "react"
import Icon from "react-fa"

// @ts-ignore
import * as styles from "./AppWrapper.module.scss"
const AppWrapper = (props: any) => (
  <div className={styles.wrapper}>
    <div className={styles.backdrop}>{props.children}</div>
  </div>
)

export default AppWrapper
