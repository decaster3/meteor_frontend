import React from "react"
import {Category} from "../../containers/Products/actions"
import {NavLink} from "react-router-dom"
import {cx} from "emotion"
import {styled} from "../App/emotion"

const LinkWrapper = styled("div")`
  font-weight: 500;
  display: flex;
  align-items: center;
  height: 5rem;
  img {
    width: 3rem;
    height: 3rem;
    margin: 0.5rem;
    transition: all 0.25s;
  }
  span {
    margin: 0 0.5rem;
  }
  a {
    color: ${props => props.theme.lighterGrey};
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

interface CategoriesNavProps extends React.HTMLProps<HTMLDivElement> {
  categories: Category[]
}

const CategoriesNav: React.SFC<CategoriesNavProps> = ({
  categories,
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
      <LinkWrapper key={category.id}>
        <NavLink to={category.url}>
          <img src={category.imgUrl} />
          <span>{category.name}</span>
        </NavLink>
      </LinkWrapper>
    ))}
  </div>
)

export default CategoriesNav
