import * as React from "react"
import * as moment from "moment"
import * as styles from "./PhoneCode.module.scss"
import PhoneCodeForm from "./PhoneCodeForm"
import {fromJS} from "immutable"

interface CodeFormProps {
  phone: string
  codeSent: string
  isCodePending: boolean
  sendCode(params: {code: string}): void
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

  componentWillMount() {
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

  handleCodeSubmit = (values: any) => {
    return this.props.sendCode(values.get("code"))
  }

  render() {
    const sentCode =
      moment().diff(moment(this.props.codeSent), "seconds") - 60 < 0 ? (
        <div className="col">
          Номер можно изменить через {this.state.counter}
        </div>
      ) : (
        <div className="form-group row">
          <div className="row">
            <div className="col">
              <button
                onClick={this.props.handleReSendPhone}
                className="btn btn-block btn-default"
              >
                Изменить номер
              </button>
            </div>
          </div>
        </div>
      )
    return (
      <div>
        <div className={styles.modalTitle}>
          <h4 className="text-center mb-3 font-weight-bold">
            Регистрация шаг 2/2
          </h4>
        </div>
        <PhoneCodeForm
          onSubmit={this.handleCodeSubmit}
          // @ts-ignore
          isCodePending={this.props.isCodePending}
          initialValues={fromJS({phone: this.props.phone})}
        />
        {sentCode}
      </div>
    )
  }
}

export default CodeForm
