import * as React from "react"
import Icon from "react-fa"
import * as classnames from "classnames"

// @ts-ignore
import * as styles from "./Wrapper.module.scss"
import Header from "../Header"
import Footer from "../Footer"
import {Status} from "../../constants"
import {City, Category} from "../../containers/App/actions"
import {User} from "../../containers/UserSession/actions"

const Wrapper = (props: {
  children?: React.ReactNode
  citiesStatus: Status
  cities: City[]
  userStatus: Status
  user: User
  categoriesStatus: Status
  categories: Category[]
}) => (
  <div className={styles.wrapper}>
    <div className={styles.backdrop}>
      <div className={classnames(styles.container, "container")}>
        <Header
          cities={props.cities}
          citiesStatus={props.citiesStatus}
          userStatus={props.userStatus}
          user={props.user}
        />
        <div className={classnames(styles.content, "row")}>
          <div className="container-fluid">{props.children}</div>
        </div>
        <Footer
          categoriesStatus={props.categoriesStatus}
          categories={props.categories}
        />
      </div>
    </div>
  </div>
)

export default Wrapper
