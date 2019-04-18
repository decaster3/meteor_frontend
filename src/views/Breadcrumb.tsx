import React from "react"
import {
  Link as ReactRouterLink,
  withRouter,
  RouteComponentProps,
} from "react-router-dom"
import {styled, theme} from "./App/emotion"
import {cx, css} from "emotion"

const BreadCrumbNav = styled("nav")`
  .breadcrumb > li + li:before {
    color: #d3d3d3;
    font-family: "fontAwesome";
    content: "\f101";
    padding: 0 5px;
  }
  .breadcrumb-item.active {
    color: ${theme.lighterGrey};
  }
`
const Ol = styled("ol")`
  background: rgba(5, 7, 20, 0.8);
`
const Link = styled(ReactRouterLink)`
  color: white;
  text-decoration: none;

  :hover,
  :focus,
  :active {
    color: ${theme.orange};
    text-decoration: none;
    text-shadow: 0 0 48px ${theme.orange};
  }
`
const breadCrumbKeys = [
  {
    key: "promotions",
    beforePath: [{name: "Меню", path: "/"}],
    activePath: "Акции",
  },
  {
    key: "cart",
    beforePath: [{name: "Меню", path: "/"}],
    activePath: "Корзина",
  },
  {
    key: "checkout",
    beforePath: [{name: "Меню", path: "/"}, {name: "Корзина", path: "/cart"}],
    activePath: "Оформление заказа",
  },
  {
    key: "account",
    beforePath: [{name: "Меню", path: "/"}],
    activePath: "Аккаунт",
  },
]

interface BreadcrumbProps extends RouteComponentProps<{}> {}

const Breadcrumb: React.StatelessComponent<BreadcrumbProps> = props => {
  const currentBreadCrumbObject = breadCrumbKeys.find(
    el => el.key === props.location.pathname.slice(1)
  )
  return (
    <>
      {currentBreadCrumbObject ? (
        <BreadCrumbNav aria-label="breadcrumb row">
          <Ol className="breadcrumb col-lg-6">
            {currentBreadCrumbObject.beforePath.map(el => (
              <li className="breadcrumb-item" key={el.name}>
                <Link to={el.path}>{el.name}</Link>
              </li>
            ))}
            <li
              className={cx(
                "breadcrumb-item active",
                css`
                  color: hsl(199, 28%, 57%);
                `
              )}
              aria-current="page"
            >
              {currentBreadCrumbObject.activePath}
            </li>
          </Ol>
        </BreadCrumbNav>
      ) : (
        <div />
      )}
    </>
  )
}

export default withRouter(Breadcrumb)
