import * as React from "react"
import {WrappedFieldProps} from "redux-form"
import * as classnames from "classnames"
import {css, cx} from "emotion"

const inputGroupStyle = css`
  margin-bottom: 32px;
`

interface CustomInputProps {
  type?: string
  className?: string
  id?: string
  placeholder?: string
  autoComplete?: string
  readOnly?: boolean
  prepend?: React.ReactNode
  append?: React.ReactNode
}

export const CustomInput = ({
  input,
  meta,
  className,
  id,
  type,
  placeholder,
  autoComplete,
  prepend,
  append,
  readOnly,
}: CustomInputProps & WrappedFieldProps) => {
  console.log("meta", meta)
  return (
    <div className={cx("input-group", inputGroupStyle)}>
      {prepend && (
        <div className="input-group-prepend">
          <span className="input-group-text">{prepend}</span>
        </div>
      )}
      <input
        className={classnames(
          "form-control",
          {
            "is-invalid": meta.touched && meta.invalid,
            "is-valid": meta.touched && meta.valid,
          },
          className
        )}
        readOnly={readOnly}
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
      {meta.touched &&
        meta.error && <div className="invalid-tooltip">{meta.error}</div>}
      {meta.touched &&
        meta.warning && <div className="valid-tooltip">{meta.warning}</div>}
    </div>
  )
}

export default CustomInput
