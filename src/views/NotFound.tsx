import React from "react"
import {Link as ReactRouterLink} from "react-router-dom"
import {styled, theme} from "./App/emotion"

const Link = styled(ReactRouterLink)`
  color: ${theme.orange};
  :focus,
  :hover,
  :active {
    color: ${theme.redOrange};
  }
`

const NotFound = () => (
  <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
    <span className="h1 mb-5">Страница не найдена</span>
    <p>
      <Link to="/" className="text-uppercase font-weight-bold">
        Вернуться на главную
      </Link>
    </p>
  </div>
)

export default NotFound
