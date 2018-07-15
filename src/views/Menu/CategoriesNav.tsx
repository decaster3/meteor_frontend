import React from "react"
import {Category} from "../../containers/Product/actions"
import {Link} from "react-router-dom"
import styles from "./Menu.module.scss"
import {cx} from "emotion"

interface CategoriesNavProps extends React.HTMLProps<HTMLDivElement> {
  categories: Category[]
  currentCategory: Category
}

const CategoriesNav: React.SFC<CategoriesNavProps> = ({
  categories,
  currentCategory,
  className,
  ...restOfProps
}) => (
  <div
    className={cx(
      "row align-items-center justify-content-around mt-4 mb-3 text-uppercase",
      className
    )}
    {...restOfProps}
  >
    {categories.map(category => (
      <div
        key={category.id}
        className={cx(styles.categoryLinkWrapper, {
          [styles.active]:
            currentCategory && category.id === currentCategory.id,
        })}
      >
        <Link to={category.url}>
          <img src={category.imgUrl} />
          <span>{category.name}</span>
        </Link>
      </div>
    ))}
  </div>
)

export default CategoriesNav
