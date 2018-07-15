import React from "react"
import {Option} from "../../containers/Category/actions"
import {OptionConcat} from "../../containers/Cart/actions"
import {cx} from "../../../node_modules/emotion"
import styles from "./ProductCard.module.scss"

interface DependentOptionsProps {
  options: Option[]
  dependentOptions: OptionConcat[]
}

const DependentOptions: React.SFC<DependentOptionsProps> = props => (
  <>
    {props.options.map(option => {
      const currentOptionValue = props.dependentOptions.find(
        currentOption => currentOption.optionId === option.id
      )
      if (currentOptionValue && option.isCharacteristic) {
        return (
          <div key={option.id} className={cx("row", styles.dependentOption)}>
            <div className="col">
              <small>{option.name}</small>
            </div>
            {option.optionValues.map(optionName => {
              if (currentOptionValue.valueId === optionName.id) {
                return (
                  <div
                    key={optionName.id}
                    className="col-auto font-weight-bold"
                  >
                    {optionName.value}
                  </div>
                )
              } else {
                return null
              }
            })}
          </div>
        )
      } else {
        return null
      }
    })}
  </>
)

export default DependentOptions
