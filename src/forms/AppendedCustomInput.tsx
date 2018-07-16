import React from "react"
import {WrappedFieldProps} from "redux-form"
import classnames from "classnames"

interface AppendedCustomInputProps
  extends React.HTMLProps<HTMLInputElement>,
    WrappedFieldProps {
  append: React.ReactNode
}

export const AppendedCustomInput = ({
  input,
  meta,
  className,
  append,
  ...restOfProps
}: AppendedCustomInputProps & WrappedFieldProps) => {
  return (
    <>
      <div className="input-group">
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
        <div className="input-group-append">
          <span className="input-group-text">{append}</span>
        </div>
      </div>

      {meta.touched &&
        meta.error && <div className="invalid-tooltip">{meta.error}</div>}
      {meta.touched &&
        meta.warning && <div className="valid-tooltip">{meta.warning}</div>}
    </>
  )
}

export default AppendedCustomInput
