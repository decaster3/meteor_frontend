import * as React from "react"
import * as classnames from "classnames"
import * as styles from "./index.module.scss"
import SignupForm from "./SignupForm"

const Signup = ({
  signUp,
  handleChangeTab,
  isPhonePending,
}: {
  isPhonePending: boolean
  handleChangeTab(): void
  signUp(phone: string, password: string, passwordConfirmation: string): void
}) => {
  const handleSignUpSubmit = (values: any) => {
    signUp(
      values.get("phone"),
      values.get("password"),
      values.get("passwordConfirmation")
    )
  }

  return (
    <div>
      <div className={styles.modalTitle}>
        <h4 className="text-center mb-3 font-weight-bold">
          Регистрация шаг 1/2
        </h4>
      </div>
      <SignupForm
        onSubmit={handleSignUpSubmit}
        // @ts-ignore
        isPhonePending={isPhonePending}
      />
      <div className="row">
        <div className={classnames(styles.miniLabel, "col")}>
          Есть аккаунт?
          <button onClick={handleChangeTab}>Войти</button>
        </div>
      </div>
    </div>
  )
}

export default Signup
