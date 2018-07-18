import React from "react"
import {compose} from "redux"
import {withUser, UserProps} from "../../containers/UserSession"
import {Status} from "../../constants"

class AccountMain extends React.Component<UserProps> {
  render() {
    switch (this.props.userInfo.userInfoStatus) {
      case Status.LOADING:
        return <p>Loading...</p>
      case Status.LOADING_ERROR:
        return <p>Loading error.</p>
      case Status.LOADED:
        if (this.props.userInfo.meteors.length > 0) {
          return this.props.userInfo.meteors.map(meteor => (
            <div key={meteor.id}>
              {meteor.description} - {meteor.value}
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

export default compose(withUser)(AccountMain)
