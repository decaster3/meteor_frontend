import React from "react"
import {Option} from "../../containers/Product/actions"
import {OptionConcat} from "../../containers/Category/actions"
import {cx} from "emotion"
import styles from "./ProductCard.module.scss"

interface IndependentOptionsProps {
  options: Option[]
  independentOptions: OptionConcat[]
  changeCurrentProduct(optionId: number, valueId: number, value: string): void
}

const IndependentOptions: React.SFC<IndependentOptionsProps> = props => (
  <>
    {props.options.map(option => {
      const currentOptionValue = props.independentOptions.find(
        currentOption => currentOption.optionId === option.id
      )
      if (currentOptionValue && !option.isCharacteristic) {
        return (
          <div className={"row no-gutters my-2"} key={option.id}>
            {option.optionValues.map(optionName => (
              <div className="col text-center" key={optionName.id}>
                <button
                  type="button"
                  name={option.id.toString()}
                  value={optionName.id}
                  onClick={() =>
                    props.changeCurrentProduct(
                      option.id,
                      optionName.id,
                      optionName.value
                    )
                  }
                  className={cx(styles.option, {
                    [styles.optionActive]:
                      currentOptionValue.valueId === optionName.id,
                  })}
                >
                  {optionName.value}
                </button>
              </div>
            ))}
          </div>
        )
      } else {
        return null
      }
    })}
  </>
)

export default IndependentOptions
