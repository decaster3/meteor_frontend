import React from "react"
import {Category} from "../../containers/Products/actions"
import {Link} from "react-router-dom"
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
  a {
    color: ${props => props.theme.lighterGrey};
    /* transition: all 0.25s; */
    :hover {
      text-decoration: none;
    }
  }
  span {
    margin: 0 0.5rem;
  }
  &.active {
    font-weight: 700;
    /* font-size: 1.25rem; */
    img {
      width: 4rem;
      height: 4rem;
      margin: 0;
    }
    a {
      color: white;
    }
  }
`

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
      <LinkWrapper
        key={category.id}
        className={cx({
          active: currentCategory && category.id === currentCategory.id,
        })}
      >
        <Link to={category.url}>
          <img src={category.imgUrl} />
          <span>{category.name}</span>
        </Link>
      </LinkWrapper>
    ))}
  </div>
)

export default CategoriesNav
