import React from "react"
import Icon from "react-fa"

import {Link as ReactRouterLink} from "react-router-dom"
import {compose} from "redux"
import withCategories from "../containers/Category"
import {Status} from "../constants"
import {Category} from "../containers/Products/actions"
import logo from "../assets/logo.svg"
import {styled} from "./App/emotion"

interface FooterProps {
  categoriesStatus: Status
  categories: Category[]
}

const Link = styled(ReactRouterLink)`
  color: white;
  text-decoration: none;

  :hover,
  :focus,
  :active {
    color: ${props => props.theme.orange};
    text-decoration: none;
    text-shadow: 0 0 48px ${props => props.theme.orange};
  }
`

const FooterBlock = styled("div")`
  letter-spacing: 0.125em;
  font-weight: 500;
  color: ${props => props.theme.lighterGrey};
  padding: 0.5rem 2rem; /* py-2 px-4 */
`

const SocialMediaAnchor = styled("a")`
  color: ${props => props.theme.orange};
  font-size: 60px;
  text-decoration: none;

  :hover,
  :focus,
  :active {
    color: ${props => props.theme.redOrange};
    text-decoration: none;
    text-shadow: 0 0 48px ${props => props.theme.redOrange};
  }
`

const BottomNavbar = styled("div")(({theme}) => ({
  backgroundColor: theme.orange,
  backgroundImage: `radial-gradient(
    ${theme.orange},
    ${theme.orange} 25%,
    ${theme.redOrange}
  )`,
  justifyContent: "space-evenly",
  alignItems: "center",
  height: "5rem",
  textTransform: "uppercase",
  fontWeight: 700,
  color: theme.darkBlue,
  letterSpacing: "0.125em",
}))

const BottomNavbarAnchor = styled(Link)`
  color: ${props => props.theme.darkBlue};

  :hover,
  :focus {
    color: white;
    text-decoration: none;
    text-shadow: 0 0 2rem white;
  }
`

const BottomNavbarSeparator = styled("div")`
  height: 3rem;
  width: 0.125rem;
  background-color: ${props => props.theme.darkBlue};
`

const Footer: React.StatelessComponent<FooterProps> = props => (
  <>
    <BottomNavbar className={"row"}>
      {props.categories.map((category, index) => (
        <React.Fragment key={index}>
          {index > 0 && <BottomNavbarSeparator />}
          <div>
            <BottomNavbarAnchor to={category.key}>
              {category.name}
            </BottomNavbarAnchor>
          </div>
        </React.Fragment>
      ))}
    </BottomNavbar>

    <div className="row align-items-center mt-3 mb-2">
      <FooterBlock className="col">
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

      <FooterBlock className="col">
        <img className={"mw-100"} src={logo} />

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

      <FooterBlock className="col">
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

export default compose(withCategories)(Footer)
