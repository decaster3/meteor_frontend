import React from "react"
import {Option, OptionConcat} from "../../containers/Products/actions"
import {cx} from "emotion"
import {styled, theme} from "../App/emotion"
import {transparentize} from "../../../node_modules/polished"

interface IndependentOptionsProps extends React.HTMLProps<HTMLDivElement> {
  options: Option[]
  independentOptions: OptionConcat[]
  changeCurrentProduct(optionId: number, valueId: number, value: string): void
}

const OptionValue = styled("button")`
  text-transform: uppercase;
  background: none;
  border: none;
  color: ${theme.lighterGrey};
  line-height: 2rem;
  padding: 0;
  transition: all 0.25s;
  :focus {
    outline: none;
    color: white;
  }
  ::after {
    content: "";
    display: block;
    background: ${transparentize(0.5, theme.lighterGrey)};
    border-radius: 0.125rem;
    height: 0.25rem;
    width: 100%;
  }
  &.active {
    color: white;
    font-size: 1.25rem;
    line-height: 2rem;
    ::after {
      content: "";
      display: block;
      background: ${theme.lightGreen};
      border-radius: 0.125rem;
      height: 0.25rem;
      width: 100%;
    }
  }
`

const IndependentOptions: React.SFC<IndependentOptionsProps> = ({
  options,
  independentOptions,
  changeCurrentProduct,
  ...restOfProps
}) => (
  <div {...restOfProps}>
    {options
      .filter(option => !option.isCharacteristic)
      .map(option => {
        const currentOptionValue = independentOptions.find(
          currentOption => currentOption.optionId === option.id
        )
        return (
          currentOptionValue && (
            <div className={"row no-gutters my-2"} key={option.id}>
              {option.optionValues
                .sort((a, b) =>
                  a.value
                    .toLocaleLowerCase()
                    .localeCompare(b.value.toLocaleLowerCase())
                )
                .map(optionValue => (
                  <div className="col text-center" key={optionValue.id}>
                    <OptionValue
                      type="button"
                      onClick={() =>
                        changeCurrentProduct(
                          option.id,
                          optionValue.id,
                          optionValue.value
                        )
                      }
                      className={cx({
                        active: currentOptionValue.valueId === optionValue.id,
                      })}
                    >
                      {optionValue.value}
                    </OptionValue>
                  </div>
                ))}
            </div>
          )
        )
      })}
  </div>
)

export default IndependentOptions
