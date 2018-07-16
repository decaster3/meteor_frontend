import React from "react"
import {Subcategory} from "../../containers/Products/actions"
import {JS_HREF, ThemeProps, withTheme} from "../App/Theme"
import {css, cx} from "emotion"

interface SubcategoriesNavProps
  extends ThemeProps,
    React.HTMLProps<HTMLDivElement> {
  subcategories?: Subcategory[]
  currentSubcategory?: Subcategory
  handleChangeSubcategory(subcategory: Subcategory): void
}

const SubcategoriesNav: React.SFC<SubcategoriesNavProps> = ({
  handleChangeSubcategory,
  currentSubcategory,
  subcategories,
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
      {subcategories && currentSubcategory ? (
        <>
          {[{id: 0, name: "Все"}, ...subcategories].map(subcategory => (
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
          ))}
        </>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  )
}

export default withTheme(SubcategoriesNav)
