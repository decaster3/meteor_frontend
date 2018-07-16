import React from "react"
import Select, {ReactSelectProps} from "react-select"
import {WrappedFieldProps} from "redux-form"

import "react-select/dist/react-select.css"
import {cx, css} from "../../node_modules/emotion"

interface CustomSelectProps extends ReactSelectProps, WrappedFieldProps {}

const CustomSelect = ({
  input: {value, onBlur, ...restOfInput},
  meta,
  className,
  ...restOfProps
}: CustomSelectProps) => {
  return (
    <>
      <Select
        className={cx(
          "form-control",
          css`
            height: 38px;
            padding: 0;
            z-index: 6;
          `,
          {
            "is-invalid": meta.touched && meta.invalid,
            "is-valid": meta.touched && meta.valid,
          },
          className
        )}
        style={{border: 0}}
        value={value || ""}
        onBlur={() => onBlur(value)}
        {...restOfProps}
        {...restOfInput}
      />

      {meta.touched &&
        meta.error && <div className="invalid-tooltip">{meta.error}</div>}
      {meta.touched &&
        meta.warning && <div className="valid-tooltip">{meta.warning}</div>}
    </>
  )
}

export default CustomSelect
