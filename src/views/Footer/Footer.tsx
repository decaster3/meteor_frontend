import React from "react"
import {css} from "emotion"

import * as styles from "./Footer.module.scss"
import {compose} from "redux"
import withCategories from "../../containers/Category"
import {Status} from "../../constants"
import {Row} from "reactstrap"
import {Category} from "../../containers/Products/actions"
import logo from "../../assets/logo.svg"
import {styled} from "../App/emotion"

interface FooterProps {
  categoriesStatus: Status
  categories: Category[]
}

const Anchor = styled("a")`
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
  letter-spacing: 0.125rem;
  font-weight: 500;
  color: ${props => props.theme.lighterGrey};
  padding: 0.5rem 2rem; /* py-2 px-4 */
`

const Footer: React.StatelessComponent<FooterProps> = props => (
  <>
    <Row className={styles.bottomNavbar}>
      {props.categories.map((category, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className={styles.bottomNavbarSeparator} />}
          <div>
            <a href="#">{category.name}</a>
          </div>
        </React.Fragment>
      ))}
    </Row>

    <div className="row align-items-center mt-3 mb-2">
      <FooterBlock className="col">
        <p>
          <Anchor href="#">Обратная связь</Anchor>
        </p>
        <p>
          <Anchor href="#">Акции и предложения</Anchor>
        </p>
        <p>
          <Anchor href="#">Доставка и оплата</Anchor>
        </p>
        <p>
          <Anchor href="#">О компании</Anchor>
        </p>
      </FooterBlock>

      <FooterBlock className="col">
        <img
          className={css`
            max-width: 100%;
          `}
          src={logo}
        />
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
