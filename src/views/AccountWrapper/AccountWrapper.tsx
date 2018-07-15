import React from "react"
import {compose} from "redux"
import {withUser} from "../../containers/UserSession"
import AccountMainInfo from "../AccountMainInfo"
import AccountMeteorHistory from "../AccountMeteorHistory"

interface AccountWrapperProps {
  getUserInfo(): void
}

class AccountWrapper extends React.Component<AccountWrapperProps> {
  componentDidMount() {
    this.props.getUserInfo()
  }
  render() {
    return (
      <>
        <AccountMainInfo />
        <AccountMeteorHistory />
      </>
    )
  }
}

export default compose(withUser)(AccountWrapper)
