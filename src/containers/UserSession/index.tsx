import {connect} from "react-redux"
import {compose} from "redux"
import injectReducer from "../../utils/injectReducer"
import {
  login,
  logout,
  getUserInfo,
  signUp,
  reSendPhone,
  sendCode,
  setInviterToken,
  UserInfo,
} from "./actions"
import reducer from "./reducer"
import {
  selectUserState,
  selectUserRegistrationStep,
  selectCodeSentTime,
  selectIsPhonePending,
  selectIsCodePending,
  selectPhone,
  selectIsLoginPending,
  selectInviterToken,
  selectUserInfoStatus,
  selectUserInfo,
} from "./selectors"

export interface UserStateProps {
  userState: string
  userInfoStatus: string
  userInfo: UserInfo
}

interface UserDispatchProps {
  login(password: string, phone: string): void
  logout(): void
  getUserInfo(): void
}

export interface UserProps extends UserStateProps, UserDispatchProps {}

const mapStateToUserProps = (state: any): UserStateProps => ({
  userState: selectUserState(state),
  userInfo: selectUserInfo(state),
  userInfoStatus: selectUserInfoStatus(state),
})

const mapDispatchToUserProps = (dispatch: any): UserDispatchProps => ({
  login: (password: string, phone: string) => dispatch(login(password, phone)),
  logout: () => dispatch(logout()),
  getUserInfo: () => dispatch(getUserInfo()),
})

interface RegistrationStateProps {
  phone: string
  inviterToken: string
  codeSent: string
  regsitrationStep: number
  isLoginPending: boolean
  isPhonePending: boolean
  isCodePending: boolean
}

interface RegistrationDispatchProps {
  signUp(
    inviterToken: string,
    name: string,
    phone: string,
    password: string,
    passwordConfirmation: string
  ): void
  sendCode(code: string): void
  reSendPhone(): void
  setInviterToken(token: string): void
}

export interface RegistrationProps
  extends RegistrationStateProps,
    RegistrationDispatchProps {}

const mapStateToRegistrationProps = (state: any): RegistrationStateProps => {
  return {
    regsitrationStep: selectUserRegistrationStep(state),
    codeSent: selectCodeSentTime(state),
    isPhonePending: selectIsPhonePending(state),
    isCodePending: selectIsCodePending(state),
    isLoginPending: selectIsLoginPending(state),
    phone: selectPhone(state),
    inviterToken: selectInviterToken(state),
  }
}
const mapDispatchToRegistrationProps = (
  dispatch: any
): RegistrationDispatchProps => ({
  signUp: (
    inviterToken: string,
    name: string,
    phone: string,
    password: string,
    passwordConfirmation: string
  ) =>
    dispatch(signUp(inviterToken, name, phone, password, passwordConfirmation)),
  sendCode: (code: string) => dispatch(sendCode(code)),
  reSendPhone: () => dispatch(reSendPhone()),
  setInviterToken: (token: string) => dispatch(setInviterToken(token)),
})

const withReducer = injectReducer({key: "userSession", reducer})

export const withRegistration = compose(
  withReducer,
  connect(
    mapStateToRegistrationProps,
    mapDispatchToRegistrationProps
  )
)

export const withUser = compose(
  withReducer,
  connect(
    mapStateToUserProps,
    mapDispatchToUserProps
  )
)
