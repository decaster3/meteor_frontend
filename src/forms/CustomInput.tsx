import React from "react"
import {WrappedFieldProps} from "redux-form"
import classnames from "classnames"

interface CustomInputProps {
  type?: string
  className?: string
  id?: string
  placeholder?: string
  autoComplete?: string
  readOnly?: boolean
  prepend?: React.ReactNode
  append?: React.ReactNode
  value?: string
}

export const CustomInput = ({
  input,
  meta,
  className,
  id,
  type,
  placeholder,
  autoComplete,
  readOnly,
}: CustomInputProps & WrappedFieldProps) => {
  return (
    <>
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

      {meta.touched &&
        meta.error && <div className="invalid-tooltip">{meta.error}</div>}
      {meta.touched &&
        meta.warning && <div className="valid-tooltip">{meta.warning}</div>}
    </>
  )
}

export default CustomInput
