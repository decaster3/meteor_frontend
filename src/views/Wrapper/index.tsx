import * as React from "react"
import Icon from "react-fa"
import * as cn from "classnames"

// @ts-ignore
import * as styles from "./index.module.scss"
import Header from "../Header"
import Footer from "../Footer"
import {Status} from "../../constants"
import {City, Category} from "../../containers/App/actions"
import {User} from "../../containers/UserSession/actions"
import {UserStatus} from "../../containers/UserSession/constants"

const Wrapper = (props: {
  children?: React.ReactNode
  citiesStatus: Status
  cities: City[]
  userStatus: UserStatus
  user: User
  categoriesStatus: Status
  categories: Category[]
}) => (
  <div className={styles.backdrop}>
    <div className={cn("container", styles.container)}>
      <Header
        cities={props.cities}
        citiesStatus={props.citiesStatus}
        userStatus={props.userStatus}
        user={props.user}
      />
      <div className={cn("row", styles.content)}>
        <div className="container-fluid py-3">{props.children}</div>
      </div>
      <Footer
        categoriesStatus={props.categoriesStatus}
        categories={props.categories}
      />
    </div>
  </div>
)

export default Wrapper
