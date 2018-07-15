import React from "react"
import {Category, Subcategory} from "../../containers/Product/actions"
import {JS_HREF, ThemeProps, withTheme} from "../App/Theme"
import {css, cx} from "emotion"

interface SubcategoriesNavProps
  extends ThemeProps,
    React.HTMLProps<HTMLDivElement> {
  category?: Category
  currentSubcategory?: Subcategory
  handleChangeSubcategory(subcategory: Subcategory): void
}

const SubcategoriesNav: React.SFC<SubcategoriesNavProps> = ({
  category,
  handleChangeSubcategory,
  currentSubcategory,
  theme,
  className,
  ...restOfProps
}) => {
  return (
    <div
      className={cx(
        "row justify-content-center align-items-center text-uppercase my-3",
        className
      )}
      {...restOfProps}
    >
      {category && currentSubcategory ? (
        <>
          {[{id: 0, name: "Все"}, ...category.subcategories].map(
            subcategory => (
              <div className="col-auto" key={subcategory.id}>
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
            )
          )}
        </>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  )
}

export default withTheme(SubcategoriesNav)
