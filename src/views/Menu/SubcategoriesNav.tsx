import React from "react"
import {Subcategory} from "../../containers/Products/actions"
import {css, cx} from "emotion"
import {JS_HREF} from "../../constants"
import {theme} from "../App/emotion"

interface SubcategoriesNavProps extends React.HTMLProps<HTMLDivElement> {
  subcategories?: Subcategory[]
  currentSubcategory?: Subcategory
  handleChangeSubcategory(subcategory: Subcategory): void
}

const SubcategoriesNav: React.SFC<SubcategoriesNavProps> = ({
  handleChangeSubcategory,
  currentSubcategory,
  subcategories,
  className,
  ...restOfProps
}) => {
  return (
    <div
      className={cx(
        "row justify-content-center align-items-center text-uppercase my-3 text-center",
        className
      )}
      {...restOfProps}
    >
      {subcategories && currentSubcategory ? (
        <>
          {[{id: 0, name: "Все"}, ...subcategories].map(subcategory => (
            <div className="col-12 col-sm-auto" key={subcategory.id}>
              <a
                className={cx(
                  {active: currentSubcategory.name === subcategory.name},
                  css`
                    &,
                    &:hover {
                      color: ${theme.lighterGrey};
                      font-weight: 500;
                      text-decoration: none;
                    }
                    &.active {
                      color: white;
                    }
                  `
                )}
                href={JS_HREF}
                onClick={() => handleChangeSubcategory(subcategory)}
              >
                {subcategory.name}
              </a>
            </div>
          ))}
        </>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  )
}

export default SubcategoriesNav
