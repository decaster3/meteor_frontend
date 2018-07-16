import React from "react"
import Select, {ReactSelectProps} from "react-select"
import {WrappedFieldProps} from "redux-form"

import "react-select/dist/react-select.css"
import {cx, css, injectGlobal} from "../../node_modules/emotion"

interface CustomSelectProps extends ReactSelectProps, WrappedFieldProps {
  size?: "lg"
}

const CustomSelect = ({
  input: {value, onBlur, ...restOfInput},
  meta,
  size,
  className,
  ...restOfProps
}: CustomSelectProps) => {
  // tslint:disable-next-line:no-unused-expression
  injectGlobal`
    .Select-placeholder,
    .Select-value-label {
      line-height: ${size === "lg" ? 48 : 38}px;
    }
  `

  return (
    <>
      <style>{`.Select-placeholder, .Select-value-label {
        line-height: 48px
      }`}</style>
      <Select
        className={cx(
          "form-control",
          css`
            padding: 0;
            z-index: 6;
          `,
          {
            "is-invalid": meta.touched && meta.invalid,
            "is-valid": meta.touched && meta.valid,
          },
          className
        )}
        style={{
          border: 0,
          height: size === "lg" ? "48px" : "38px",
        }}
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
