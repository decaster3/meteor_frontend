import * as React from "react"
import * as moment from "moment"
import {reduxForm} from "redux-form/immutable"
import {Field} from "redux-form"
import {Link} from "react-router-dom"

import * as styles from "./index.module.scss"
import CustomInput from "./CustomInput"

interface CodeFormProps {
  codeSent: string
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
    console.log(this.props.codeSent)
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
        <div>
          Возможность изменить телефон или отправить код снова будет через:{" "}
          {this.state.counter}
        </div>
      ) : (
        <button
          onClick={this.props.handleReSendPhone}
          className="btn btn-default"
        >
          Изменить номер
        </button>
      )
    return (
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
            <button className="btn btn-block btn-success" type="submit">
              Далее
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export interface CodeFormValues {
  code: string
}

const validateCodeFrom = (values: CodeFormValues) => ({
  code: values.code ? undefined : "Required",
})

export default reduxForm({
  form: "registrationCode",
  validate: validateCodeFrom,
})(CodeForm as any)
