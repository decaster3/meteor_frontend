import React from "react"
import {Link as ReactRouterLink} from "react-router-dom"

import {styled} from "../App/emotion"

const Link = styled(ReactRouterLink)`
  color: ${props => props.theme.orange};
  :focus,
  :hover,
  :active {
    color: ${props => props.theme.redOrange};
  }
`

const EmtyCart = () => (
  <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
    <span className="h1 mb-5">Коризна пуста! 🚀🚀🚀 </span>
    <p className="mt-5">
      <Link to="/" className="text-uppercase font-weight-bold">
        Перейти к меню
      </Link>
    </p>
  </div>
)

export default EmtyCart
