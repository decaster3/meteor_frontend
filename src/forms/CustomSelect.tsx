import * as React from "react"
import Select from "react-select"
import {WrappedFieldProps} from "redux-form"

interface CustomSelectProps {
  clearable?: boolean
  searchable?: boolean
  options: any[]
  input?: any
  placeholder?: string
}

const CustomSelect = (props: CustomSelectProps & WrappedFieldProps) => {
  // const {input, options} = props
  // const handleInputChange = (value: string) => {
  //   props.input.input.onChange(value)
  // }
  // const blur = (value: string) => {
  //   props.input.input.onBlur(input.input.value)
  // }
  const {placeholder, input, clearable, searchable, options, ...rest} = props
  return (
    <Select
      value={input.value}
      onChange={input.onChange}
      // tslint:disable-next-line:jsx-no-lambda
      onBlur={() => input.onBlur(input.value)}
      options={options}
      placeholder={placeholder}
      className="form-control"
      // onChange={handleInputChange}
    />
  )
}
export default CustomSelect
