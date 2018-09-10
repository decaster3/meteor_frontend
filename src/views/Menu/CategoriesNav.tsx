import React from "react"
import {Category} from "../../containers/Products/actions"
import {NavLink} from "react-router-dom"
import {cx, css} from "emotion"
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
const Divider = styled("hr")`
  background: ${props => props.theme.darkBlue};
  margin-top: 30px;
  margin-bottom: 0px;
  width: 100%;
  height: 1px;
`
const Menu = styled("h1")`
  font-size: 3rem;
  line-height: 4.5rem;
  font-weight: 700;
  text-align: center;
  color: ${props => props.theme.orange};
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
        "row align-items-center justify-content-around mt-4 mb-3 text-uppercase",
        className
      )}
      {...restOfProps}
    >
      {categories.map(category => (
        <LinkWrapper key={category.id}>
          <NavLink to={`/${category.key}`}>
            <img src={category.imgUrl} />
            <span>{category.name}</span>
          </NavLink>
        </LinkWrapper>
      ))}
    </div>
  </>
)

export default CategoriesNav
