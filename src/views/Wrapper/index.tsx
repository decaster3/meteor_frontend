import * as React from "react"
import Icon from "react-fa"

// @ts-ignore
import * as styles from "./index.module.scss"
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
  <div className={styles.backdrop}>
    <div className={styles.container}>
      <Header
        cities={props.cities}
        citiesStatus={props.citiesStatus}
        userStatus={props.userStatus}
        user={props.user}
      />
      <div className={styles.content}>
        <div className="container-fluid">{props.children}</div>
      </div>
      <Footer
        categoriesStatus={props.categoriesStatus}
        categories={props.categories}
      />
    </div>
  </div>
)

export default Wrapper
