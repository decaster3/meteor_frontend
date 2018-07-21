import React from "react"
import {Option, OptionConcat} from "../../containers/Products/actions"
import {cx} from "emotion"
import styles from "./ProductCard.module.scss"
import _ from "lodash"

interface IndependentOptionsProps extends React.HTMLProps<HTMLDivElement> {
  options: Option[]
  independentOptions: OptionConcat[]
  changeCurrentProduct(optionId: number, valueId: number, value: string): void
}

const IndependentOptions: React.SFC<IndependentOptionsProps> = ({
  options,
  independentOptions,
  changeCurrentProduct,
  ...restOfProps
}) => (
  <div {...restOfProps}>
    {options.filter(option => !option.isCharacteristic).map(option => {
      const currentOptionValue = independentOptions.find(
        currentOption => currentOption.optionId === option.id
      )
      return (
        currentOptionValue && (
          <div className={"row no-gutters my-2"} key={option.id}>
            {_.sortBy(option.optionValues, x => x.value).map(optionValue => (
              <div className="col text-center" key={optionValue.id}>
                <button
                  type="button"
                  onClick={() =>
                    changeCurrentProduct(
                      option.id,
                      optionValue.id,
                      optionValue.value
                    )
                  }
                  className={cx(styles.option, {
                    [styles.optionActive]:
                      currentOptionValue.valueId === optionValue.id,
                  })}
                >
                  {optionValue.value}
                </button>
              </div>
            ))}
          </div>
        )
      )
    })}
  </div>
)

export default IndependentOptions
