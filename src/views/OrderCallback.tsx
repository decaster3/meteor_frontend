import React from "react"
import {Link as ReactRouterLink, match} from "react-router-dom"
import {withUser, UserStateProps} from "../containers/UserSession"
import {withTheme, styled, ThemeProps} from "./App/emotion"
import {css} from "emotion"
import SignUp from "../views/AuthWrapper"
import {UserState} from "../containers/UserSession/constants"
import {compose} from "redux"

const Link = styled(ReactRouterLink)`
  color: ${props => props.theme.orange};
  text-decoration: none;
  :focus,
  :hover,
  :active {
    color: ${props => props.theme.redOrange};
    text-decoration: none;
  }
`

interface OrderCallbackProps extends UserStateProps, ThemeProps {
  match: match<{status?: string; id: number; phone: string}>
}

interface OrderCallbackState {
  authModalShown: boolean
}

class OrderCallback extends React.Component<
  OrderCallbackProps,
  OrderCallbackState
> {
  state: OrderCallbackState = {
    authModalShown: false,
  }
  toggle = () =>
    this.setState(prevState => ({authModalShown: !prevState.authModalShown}))
  render() {
    return (
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
        <span className="h1 mb-5">
          Заказ №{this.props.match.params.id} оформлен успешно! 🚀🚀🚀
        </span>
        <p className="h5 mb-5">
          {`После доставки заказа, на аккаунт с номером ${
            this.props.match.params.phone
          } поступят бонусные баллы!`}
        </p>
        {this.props.userState !== UserState.LOGED_IN && (
          <div>
            <button
              onClick={this.toggle}
              className={css`
                background-color: ${this.props.theme.lightGreen};
                color: white;
                text-transform: uppercase;
                font-weight: 500;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 0.25rem;
                letter-spacing: 0.125em;

                &:focus,
                &:hover {
                  background-color: ${this.props.theme.darkGreen};
                }
              `}
            >
              Зарегестрируйся или войди
            </button>

            <SignUp
              modalShown={this.state.authModalShown}
              toggle={this.toggle}
              registrationFirst={true}
            />

            <p className="h5 mt-3">чтобы использовать бонусные баллы</p>
          </div>
        )}
        <p className="mt-5">
          <Link to="/" className="text-uppercase font-weight-bold">
            Вернуться на главную
          </Link>
        </p>
      </div>
    )
  }
}

export default compose(
  withTheme,
  withUser
)(OrderCallback)
