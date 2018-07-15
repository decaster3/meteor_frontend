import React from "react"
import Select from "react-select"
import {WrappedFieldProps} from "redux-form"

import "react-select/dist/react-select.css"
import {cx} from "emotion"

interface CustomSelectProps {
  clearable?: boolean
  searchable?: boolean
  options: any[]
  input?: any
  placeholder?: string
  className?: string
}

const CustomSelect = (props: CustomSelectProps & WrappedFieldProps) => {
  // const {input, options} = props
  // const handleInputChange = (value: string) => {
  //   props.input.input.onChange(value)
  // }

  // const blur = (value: string) => {
  //   props.input.input.onBlur(input.input.value)
  // }

  const {
    placeholder,
    input,
    clearable,
    searchable,
    options,
    className,
    ...rest
  } = props

  return (
    <Select
      className={className}
      value={input.value}
      onChange={input.onChange}
      // tslint:disable-next-line:jsx-no-lambda
      // onBlur={() => input.onBlur(input.value)}
      options={options}
      placeholder={placeholder}
      // onChange={handleInputChange}
      style={{height: 38}}
      {...rest}
    />
  )
}
export default CustomSelect
