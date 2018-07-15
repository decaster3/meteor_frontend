import React from "react"
import {compose} from "redux"
import {withUser} from "../../containers/UserSession"
import {UserInformation} from "../../containers/UserSession/actions"
import {Status} from "../../constants"

interface AccountMainProps {
  userInfo: UserInformation
}

class AccountMain extends React.Component<AccountMainProps> {
  renderMeteorsHistory = () => {
    switch (this.props.userInfo.userInfoStatus) {
      case Status.LOADING:
        return <p>Loading...</p>
      case Status.LOADING_ERROR:
        return <p>Loading error.</p>
      case Status.LOADED:
        if (this.props.userInfo.meteors.length > 0) {
          return this.props.userInfo.meteors.map(el => (
            <div key={el.id}>
              {el.description} -
              {el.value}
            </div>
          ))
        } else {
          return <div>Здесь будет отображена история начисления метеоров</div>
        }
      default:
        return <p>Something went wrong. Reload the page.</p>
    }
  }
  render() {
    const meteorsHistory = this.renderMeteorsHistory()
    return <>{meteorsHistory}</>
  }
}

export default compose(withUser)(AccountMain)
