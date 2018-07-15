import React from "react"
import {compose} from "redux"
import {withUser} from "../../containers/UserSession"
import {UserInformation} from "../../containers/UserSession/actions"

interface AccountMainProps {
  userInfo: UserInformation
}

class AccountMain extends React.Component<AccountMainProps> {
  render() {
    return (
      <>
        имя
        {this.props.userInfo.name}
        телефон
        {this.props.userInfo.phone}
        токен
        {this.props.userInfo.token}
        {/* {this.props.userInfo.meteors[0].value} */}
      </>
    )
  }
}

export default compose(withUser)(AccountMain)
