import React from "react"
import {compose} from "redux"
import {withUser, UserProps} from "../../containers/UserSession"
import {Status} from "../../constants"
import {cx, css} from "emotion"
import {ThemeProps} from "../App/Theme"
import {withTheme} from "../../../node_modules/emotion-theming"

interface BonusHistoryProps extends UserProps, ThemeProps {}

class BonusHistory extends React.Component<BonusHistoryProps> {
  render() {
    switch (this.props.userInfo.userInfoStatus) {
      case Status.LOADING:
        return <p>Loading...</p>
      case Status.LOADING_ERROR:
        return <p>Loading error.</p>
      case Status.LOADED:
        if (this.props.userInfo.meteors.length > 0) {
          return this.props.userInfo.meteors.map(meteor => (
            <div
              key={meteor.id}
              className={css`
                background: ${this.props.theme.darkBlue};
              `}
            >
              <div className={"row align-items-center my-3 p-3"}>
                <div className="col">{meteor.description}</div>
                <div className="col-auto">
                  <span className="h4 mb-0">{meteor.value}</span>
                </div>
              </div>
            </div>
          ))
        } else {
          return <div>Здесь будет отображена история начисления метеоров</div>
        }
      default:
        return <p>Something went wrong. Reload the page.</p>
    }
  }
}

export default compose(
  withUser,
  withTheme
)(BonusHistory)
