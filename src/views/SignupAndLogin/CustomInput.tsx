import * as React from "react"
import {WrappedFieldProps} from "redux-form"
import * as classnames from "classnames"

interface CustomInputProps {
  type?: string
  className?: string
  id?: string
  placeholder?: string
  autoComplete?: string
  prepend?: React.ReactNode
  append?: React.ReactNode
}

export const CustomInput = ({
  input,
  meta: {touched, error, warning, autofilled} = {
    touched: undefined,
    error: undefined,
    warning: undefined,
    autofilled: undefined,
  },
  className,
  id,
  type,
  placeholder,
  autoComplete,
  prepend,
  append,
}: CustomInputProps & WrappedFieldProps) => (
  <div className="input-group">
    {prepend && (
      <div className="input-group-prepend">
        <span className="input-group-text">{prepend}</span>
      </div>
    )}
    <input
      className={classnames(
        "form-control",
        {"is-invalid": touched && error},
        className
      )}
      id={id}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      {...input}
    />
    {append && (
      <div className="input-group-append">
        <span className="input-group-text">{append}</span>
      </div>
    )}
    {touched && error && <div className="invalid-tooltip">{error}</div>}
  </div>
)

export default CustomInput
