import React from "react"
import {Category, Subcategory} from "../../containers/Product/actions"

interface SubcategoriesNavProps extends React.HTMLProps<HTMLDivElement> {
  category?: Category
  currentSubcategory?: Subcategory
  handleChangeSubcategory(subcategory: Subcategory): void
}

const SubcategoriesNav: React.SFC<SubcategoriesNavProps> = ({
  category,
  handleChangeSubcategory,
  currentSubcategory,
  ...restOfProps
}) => {
  return (
    <div {...restOfProps}>
      {category && currentSubcategory ? (
        <>
          {[...category.subcategories, {id: 0, name: "Все"}].map(
            subcategory => (
              <div key={subcategory.id}>
                <button onClick={() => handleChangeSubcategory(subcategory)}>
                  {subcategory.name}
                  {currentSubcategory.name === subcategory.name && " Выбрана"}
                </button>
              </div>
            )
          )}
        </>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  )
}

export default SubcategoriesNav
