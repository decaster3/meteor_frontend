import * as React from "react"
import {compose} from "redux"
import {withUser} from "../../containers/UserSession"
import {UserInformation} from "../../containers/UserSession/actions"

interface AccountMainProps {
  userInfo: UserInformation
  getUserInfo(): void
}

class AccountMain extends React.Component<AccountMainProps> {
  componentDidMount() {
    this.props.getUserInfo()
  }
  render() {
    return (
      <>
        {this.props.userInfo.name}
        {this.props.userInfo.phone}
        {this.props.userInfo.token}
        {/* {this.props.userInfo.meteors[0].value} */}
      </>
    )
  }
}

export default compose(withUser)(AccountMain)
