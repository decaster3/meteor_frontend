import React from "react"
import moment from "moment"
import * as styles from "./PhoneCode.module.scss"
import PhoneCodeForm, {ImmutablePhoneCodeFormData} from "./PhoneCodeForm"
import {fromJS} from "immutable"

interface CodeFormProps {
  phone: string
  codeSent: string
  isCodePending: boolean
  sendCode(code: string): void
  handleReSendPhone(): void
}

interface CodeFormState {
  timer: any
  counter: number
}

class CodeForm extends React.Component<CodeFormProps, CodeFormState> {
  state: CodeFormState = {
    timer: null,
    counter: 0,
  }

  componentDidMount() {
    this.setState({
      counter: 60 - moment().diff(moment(this.props.codeSent), "seconds"),
    })
    const timer = setInterval(this.tick, 1000)
    this.setState({timer})
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  tick = () => {
    this.setState({
      counter: this.state.counter - 1,
    })
  }

  handleCodeSubmit = (values: ImmutablePhoneCodeFormData) => {
    return this.props.sendCode(values.get("code"))
  }

  render() {
    return (
      <div>
        <div className={styles.modalTitle}>
          <h4 className="text-center mb-3 font-weight-bold">
            Регистрация шаг 2/2
          </h4>
        </div>

        <PhoneCodeForm
          onSubmit={this.handleCodeSubmit}
          isCodePending={this.props.isCodePending}
          initialValues={fromJS({phone: this.props.phone})}
        />

        <div className="mt-3">
          {moment().diff(moment(this.props.codeSent), "seconds") - 60 < 0 ? (
            `Номер можно изменить через ${this.state.counter}`
          ) : (
            <button
              onClick={this.props.handleReSendPhone}
              className="btn btn-block btn-outline-success"
            >
              Изменить номер
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default CodeForm
