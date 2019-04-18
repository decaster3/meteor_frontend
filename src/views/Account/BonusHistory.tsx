import React from "react"
import {compose} from "redux"
import {withUser, UserProps} from "../../containers/UserSession"
import {Status} from "../../constants"
import {Link as ReactRouterLink} from "react-router-dom"
import {styled, theme} from "../App/emotion"

type BonusHistoryProps = UserProps

const Link = styled(ReactRouterLink)`
  color: ${theme.orange};
  text-decoration: none;
  :focus,
  :hover,
  :active {
    color: ${theme.redOrange};
    text-decoration: none;
  }
`

class BonusHistory extends React.Component<BonusHistoryProps> {
  render() {
    switch (this.props.userInfo.userInfoStatus) {
      case Status.LOADING:
        return <p>Загрузка...</p>
      case Status.LOADING_ERROR:
        return (
          <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
            <p className="h2 mb-5">
              Ошибка загрузки. Проверьте соединение с интернетом и перезагрузите
              страницу
            </p>
          </div>
        )
      case Status.LOADED:
        return this.props.userInfo.meteors.length > 0 ? (
          this.props.userInfo.meteors.map(meteor => (
            <div key={meteor.id} className={"bg-darkblue"}>
              <div className={"row align-items-center my-3 p-3"}>
                <div className="col">{meteor.description}</div>
                <div className="col-auto">
                  <span className="h4 mb-0">{meteor.value}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
            <p className="h2 mb-5">
              Здесь будет отображена история получения бонусов
            </p>
            <p>
              <Link
                to="/bonus-system"
                className="text-uppercase font-weight-bold"
              >
                Как получить бонусы?
              </Link>
            </p>
          </div>
        )
      default:
        return (
          <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
            <p className="h2 mb-5">
              Ошибка загрузки. Проверьте соединение с интернетом и перезагрузите
              страницу
            </p>
          </div>
        )
    }
  }
}

export default compose(withUser)(BonusHistory)
