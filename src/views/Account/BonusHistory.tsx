import React from "react"
import {compose} from "redux"
import {withUser, UserProps} from "../../containers/UserSession"
import {Status} from "../../constants"
import {css} from "emotion"
import {ThemeProps} from "../App/emotion"
import {withTheme} from "emotion-theming"

interface BonusHistoryProps extends UserProps, ThemeProps {}

class BonusHistory extends React.Component<BonusHistoryProps> {
  render() {
    switch (this.props.userInfo.userInfoStatus) {
      case Status.LOADING:
        return <p>Загрузка...</p>
      case Status.LOADING_ERROR:
        return <p>Ошибка загрузки. Перезагрузите страницу.</p>
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
          <div>Здесь будет отображена история начисления метеоров.</div>
        )
      default:
        return <p>Что-то пошло не так. Перезагрузите страницу.</p>
    }
  }
}

export default compose(
  withUser,
  withTheme
)(BonusHistory)
