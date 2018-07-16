import React from "react"
import {WrappedFieldProps} from "redux-form"
import classnames from "classnames"

interface CustomInputProps
  extends React.HTMLProps<HTMLInputElement>,
    WrappedFieldProps {}

export const CustomInput = ({
  input,
  meta,
  className,
  ...restOfProps
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
        {...restOfProps}
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
