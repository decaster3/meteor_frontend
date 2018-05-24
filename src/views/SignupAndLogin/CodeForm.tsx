import * as React from "react"
import * as moment from "moment"
import {reduxForm} from "redux-form/immutable"
import {PulseLoader} from "react-spinners"
import {Field} from "redux-form/immutable"
import {Link} from "react-router-dom"

import * as styles from "./index.module.scss"
import CustomInput from "./CustomInput"

interface CodeFormProps {
  phone: string
  codeSent: string
  isCodePending: boolean
  handleSubmit(event: React.SyntheticEvent<HTMLFormElement>): void
  handleReSendPhone(): void
}
interface CodeFormState {
  timer: any
  counter: number
}

class CodeForm extends React.Component<CodeFormProps, CodeFormState> {
  constructor(props: CodeFormProps) {
    super(props)
    this.state = {
      timer: null,
      counter: 0,
    }
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
  render() {
    const sentCode =
      moment().diff(moment(this.props.codeSent), "seconds") - 60 < 0 ? (
        <div className="col">
          <div className="form-group row">
            Мы отправили смс с кодом на номер {this.props.phone}
          </div>
          <div className="form-group row">{this.state.counter}</div>
          <div className="form-group row">
            <button
              onClick={this.props.handleReSendPhone}
              className="btn btn-default"
              disabled={true}
            >
              Изменить номер
            </button>
          </div>
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
          <h4 className="text-center mb-3 font-weight-bold">Регистрация</h4>
        </div>
        <form onSubmit={this.props.handleSubmit}>
          <div className="form-group row">
            <label className="col-4 col-form-label" htmlFor="code">
              Введите код из смс
            </label>
            <div className="col-8">
              <Field
                component={CustomInput}
                name="code"
                props={{
                  id: "code",
                  type: "code",
                  placeholder: "Код",
                  autoComplete: "code",
                }}
              />
            </div>
          </div>
          {sentCode}
          <div className="row">
            <div className="col">
              <button
                className="btn btn-block btn-success"
                type="submit"
                disabled={this.props.isCodePending}
              >
                {this.props.isCodePending ? (
                  <PulseLoader color={"#ffffff"} size={8} />
                ) : (
                  <span>Далее</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export interface CodeFormValues {
  code: string
}

const validateCodeFrom = (values: any) => ({
  code: values.get("code") ? undefined : "Required",
})

export default reduxForm({
  form: "registrationCode",
  validate: validateCodeFrom,
})(CodeForm as any)
