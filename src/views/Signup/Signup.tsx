import React from "react"
import classnames from "classnames"

import * as styles from "./Signup.module.scss"
import SignupForm from "./SignupForm"
import {fromJS} from "immutable"

interface SignupProps {
  isPhonePending: boolean
  inviterToken: string
  handleChangeTab(): void
  signUp(
    inviterToken: string,
    name: string,
    phone: string,
    password: string,
    passwordConfirmation: string
  ): void
}

const Signup: React.StatelessComponent<SignupProps> = props => {
  const handleSignUpSubmit = (values: any) =>
    props.signUp(
      values.get("inviterToken"),
      values.get("name"),
      values.get("phone"),
      values.get("password"),
      values.get("passwordConfirmation")
    )

  return (
    <div>
      <div className={styles.modalTitle}>
        <h4 className="text-center mb-3 font-weight-bold">
          Регистрация шаг 1/2
        </h4>
      </div>
      <SignupForm
        onSubmit={handleSignUpSubmit}
        initialValues={fromJS({inviterToken: props.inviterToken})}
        isPhonePending={props.isPhonePending}
      />
      <div className="row align-items-center">
        <div className={classnames(styles.miniLabel, "col-auto")}>
          Есть аккаунт?
        </div>
        <div className="col">
          <button
            className="btn btn-block btn-outline-success"
            onClick={props.handleChangeTab}
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup
