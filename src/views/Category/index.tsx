import * as React from "react"
import {Category} from "../../containers/Menu/actions"

const Category = (props: {
  category: Category
  getProductsAfterCategoryClick(category: Category): void
  setCurrentCategory(category: Category): void
}) => {
  const handleCategoryClick = () => {
    props.getProductsAfterCategoryClick(props.category)
    props.setCurrentCategory(props.category)
  }
  return <button onClick={handleCategoryClick}>{props.category.name}</button>
}

export default Category
