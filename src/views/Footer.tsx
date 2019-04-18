import React from "react"
import Icon from "react-fa"

import {
  Link as ReactRouterLink,
  NavLink as ReactRouterNavLink,
  withRouter,
  RouteComponentProps,
} from "react-router-dom"
import {compose} from "redux"

import withCategories from "../containers/Category"
import {Status} from "../constants"
import {Category} from "../containers/Products/actions"
import logo from "../assets/logo.svg"
import {styled, theme} from "./App/emotion"

interface FooterProps extends RouteComponentProps<{category?: string}> {
  categoriesStatus: Status
  categories: Category[]
}

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

const FooterBlock = styled("div")`
  letter-spacing: 0.125em;
  font-weight: 500;
  color: ${theme.lighterGrey};
  padding: 0.5rem 2rem; /* py-2 px-4 */
`

const SocialMediaAnchor = styled("a")`
  color: ${theme.orange};
  font-size: 60px;
  text-decoration: none;
  :hover,
  :focus,
  :active {
    color: ${theme.redOrange};
    text-decoration: none;
    text-shadow: 0 0 48px ${theme.redOrange};
  }
`

const BottomNavbar = styled("div")({
  backgroundColor: theme.orange,
  backgroundImage: `radial-gradient(
    ${theme.orange},
    ${theme.orange} 25%,
    ${theme.redOrange}
  )`,
  justifyContent: "space-evenly",
  alignItems: "center",
  textTransform: "uppercase",
  fontWeight: 700,
  color: theme.darkBlue,
  letterSpacing: "0.125em",
  margin: "0 -15px",
})

const BottomNavbarNavLink = styled(ReactRouterNavLink)`
  color: ${theme.darkBlue};
  text-decoration: none;
  :hover,
  :focus,
  :focus,
  &.active {
    color: white;
    text-decoration: none;
    text-shadow: 0 0 2rem white;
  }
`

// const BottomNavbarSeparator = styled("div")`
//   height: 3rem;
//   width: 0.125rem;
//   background-color: ${theme.darkBlue};
// `

const LogotypeImg = styled("img")`
  max-height: 60px;
  max-width: 100%;
  margin: 0 auto;
  display: block;
`

const Footer: React.StatelessComponent<FooterProps> = props => (
  <>
    <BottomNavbar>
      <div className="row text-center">
        {props.categories.map(category => (
          <div
            key={category.id}
            className="col-12 col-sm-6 col-md-4 col-xl-2 py-4"
          >
            <BottomNavbarNavLink to={`/${category.key}`}>
              {category.name}
            </BottomNavbarNavLink>
          </div>
        ))}
      </div>
    </BottomNavbar>

    <div className="row align-items-center mt-3 mb-2">
      <FooterBlock className="col-12 col-lg order-1 order-lg-2">
        <LogotypeImg src={logo} />
        <div className="row mt-3">
          <div className="col text-center">
            <SocialMediaAnchor href="#">
              <Icon name="vk" />
            </SocialMediaAnchor>
          </div>
          <div className="col text-center">
            <SocialMediaAnchor href="#">
              <Icon name="instagram" />
            </SocialMediaAnchor>
          </div>
          <div className="col text-center">
            <SocialMediaAnchor href="#">
              <Icon name="facebook" />
            </SocialMediaAnchor>
          </div>
        </div>
      </FooterBlock>

      <FooterBlock className="col-12 col-md-6 col-lg order-2 order-lg-1">
        <p>
          <Link to="/promotions">Обратная связь</Link>
        </p>
        <p>
          <Link to="/promotions">Акции и предложения</Link>
        </p>
        <p>
          <Link to="/delivery">Доставка и оплата</Link>
        </p>
        <p>
          <Link to="/about-company">О компании</Link>
        </p>
      </FooterBlock>

      <FooterBlock className="col-12 col-md-6 col-lg order-3">
        <p>
          Поддержка клиентов
          <br />
          +7 727 321 22 21
        </p>
        <p>Копирайт &copy; {new Date().getFullYear()}</p>
        <p>Все права защищены.</p>
      </FooterBlock>
    </div>
  </>
)

export default compose(
  withRouter,
  withCategories
)(Footer)
