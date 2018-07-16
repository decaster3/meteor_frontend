import React from "react"
import {Option, OptionConcat} from "../../containers/Category/actions"
import {cx} from "emotion"
import styles from "./ProductCard.module.scss"

interface DependentOptionsProps extends React.HTMLProps<HTMLDivElement> {
  options: Option[]
  dependentOptions: OptionConcat[]
}

const DependentOptions: React.SFC<DependentOptionsProps> = ({
  options,
  dependentOptions,
  ...restOfProps
}) => (
  <div {...restOfProps}>
    {options.filter(option => option.isCharacteristic).map(option => {
      const dependentOption = dependentOptions.find(
        x => x.optionId === option.id
      )

      const optionValue =
        dependentOption &&
        option.optionValues.find(x => dependentOption.valueId === x.id)

      return (
        optionValue && (
          <div key={option.id} className={cx("row", styles.dependentOption)}>
            <div className="col">
              <small>{option.name}</small>
            </div>
            <div key={optionValue.id} className="col-auto font-weight-bold">
              {optionValue.value}
            </div>
          </div>
        )
      )
    })}
  </div>
)

export default DependentOptions
