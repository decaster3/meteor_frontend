import {cx} from "emotion"
import React from "react"
import {NavLink} from "react-router-dom"
import {Category} from "../../containers/Products/actions"
import {styled, theme} from "../App/emotion"

const LinkWrapper = styled("div")`
  font-weight: 500;
  img {
    width: 3rem;
    height: 3rem;
    margin: 0.5rem;
    transition: all 0.25s;
  }
  a {
    display: flex;
    align-items: center;
    color: ${theme.lighterGrey};
    /* transition: all 0.25s; */
    :hover {
      text-decoration: none;
    }
    &.active {
      font-weight: 700;
      color: white;
      img {
        width: 4rem;
        height: 4rem;
        margin: 0;
      }
    }
  }
`
const Divider = styled("hr")`
  background: ${theme.darkBlue};
  margin-top: 24px;
  width: 100%;
  height: 1px;
`
const Menu = styled("h1")`
  font-size: 3rem;
  line-height: 4.5rem;
  font-weight: 700;
  text-align: center;
  color: ${theme.orange};
`

interface CategoriesNavProps extends React.HTMLProps<HTMLDivElement> {
  categories: Category[]
}

const CategoriesNav: React.SFC<CategoriesNavProps> = ({
  categories,
  className,
  ...restOfProps
}) => (
  <>
    <Divider />
    <div
      className={cx(
        "row no-gutters align-items-center justify-content-around mt-3 mb-3 text-uppercase",
        className
      )}
      {...restOfProps}
    >
      {categories.map(category => (
        <LinkWrapper
          className="col-12 col-sm-6 col-md-4 col-xl-2"
          key={category.id}
        >
          <NavLink to={`/${category.key}`}>
            <img src={category.imgUrl} />
            <span className="mx-2">{category.name}</span>
          </NavLink>
        </LinkWrapper>
      ))}
    </div>
  </>
)

export default CategoriesNav
